import * as React from 'react';
import {Alert, Dimensions, Pressable, StyleSheet} from 'react-native';
import {Text, View, FlatList} from 'react-native';
import Food from '../../components/cards/food';
import FocusedStatusBar from '../../components/statusBar';
import {RestaurantScreenProps} from '../../navigation/homeScreenStackNavigator/types';
import {colors} from '../../utilities';
import {useResource} from '../../contexts/resource';
import {getFeatures, getFoodList} from '../../utilities/cloud/functions';
import Entypo from 'react-native-vector-icons/Entypo';
import FoodCategoryHeader from '../../components/header/foodCategory';
import Loader from '../../components/loader/loader';
import {useIsFocused} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import Feather from 'react-native-vector-icons/Feather';
import NoInternet from '../../components/NoInternet';
import firebase from '@react-native-firebase/app';
const {height, width} = Dimensions.get('window');

function ViewRestaurant({navigation, route}: RestaurantScreenProps) {
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [netState, setNetState] = React.useState<any>(null);
  const [categories, setCategories] = React.useState<Array<any>>([]);
  const [features, setFeatures] = React.useState<any>({});
  const [activeTab, setActiveTab] = React.useState<number>(0);
  let trigger = React.useRef(false);
  let Resouce = useResource();
  const [foodList, setFoodList] = React.useState<Array<any>>([]);
  const [searchList, setSearchList] = React.useState<Array<any>>([]);
  // const tablist = React.useRef<Array<any>>([]);
  const [tablist, setTablist] = React.useState<Array<any>>([]);
  const {collection, id, name, address, isOpen} = route.params;
  let isFocused = useIsFocused();
  const goBack = () => {
    navigation.navigate('Home');
  };
  // const fetchFeatures = async () => {
  //   try {
  //     // setInitializing(true);
  //     let res = await getFeatures();
  //     if (res) {
  //       let data = res.data;
  //       // //console.log(data);
  //       setFeatures(data);
  //       // setInitializing(false);
  //     }
  //   } catch (error) {
  //     // setInitializing(false);
  //     throw error;
  //   }
  // };
  const openBottomSheet = () => {
    trigger.current = true;
  };
  const closeBottomSheet = () => {
    trigger.current = false;
  };

  // const extractCategories = (list: Array<any>) => {
  //   let raw = list.map(item => item.category);
  //   return [...new Set(raw)];
  // };
  // const fetchFoodList = async () => {
  //   try {
  //     let res = await getFoodList({parentName: collection, parentID: id});
  //     if (res && res.data && isFocused) {
  //       let list = JSON.parse(res.data);
  //       let catList = extractCategories(list);
  //       setCategories(catList);
  //       setFoodList(list);
  //       setSearchList(list);
  //       let items = list.filter((item: any) => item.category == catList[0]);
  //       setActiveTab(0);
  //       // setTabList(items);
  //       setTablist(items);
  //       setInitializing(false);
  //     }
  //   } catch (error) {
  //     // throw error;
  //     //console.log(error);
  //   }
  // };

  const onCategoryClick = (categoryName: string, index: number) => {
    let list = foodList.filter(item => item.category == categoryName);
    setActiveTab(index);
    setTablist(list);
  };

  // React.useEffect(() => {
  //   if (isFocused)
  //     fetchFeatures().catch(error => {
  //       throw error;
  //     });
  // }, []);
  // React.useEffect(() => {
  //   if (isFocused)
  //     fetchFoodList().catch(error => {
  //       throw error;
  //     });
  //   return;
  // }, []);
  React.useEffect(() => {
    setInitializing(true);
    const getFoodMenu = firebase
      .app('SECONDARY_APP')
      .firestore()
      .collection(collection)
      .doc(id)
      .collection('foods')
      .onSnapshot(snap => {
        let categories: Array<any> = [];
        let list: Array<any> = [];
        snap.forEach(food => {
          categories.push(food.data().category);
          list.push({...food.data(), id: food.id});
        });
        // let list = snap.docs;
        // let catList = extractCategories(list);
        setCategories([...new Set(categories)]);
        setFoodList(list);
        setSearchList(list);
        let items = list.filter(
          (item: any) => item.category == [...new Set(categories)][0],
        );
        setActiveTab(0);
        // setTabList(items);
        setTablist(items);
        // setInitializing(false);
        setInitializing(false);
      });
    return () => getFoodMenu();
  }, []);
  React.useEffect(() => {
    const getFeatures = firebase
      .app('SECONDARY_APP')
      .firestore()
      .collection('Features')
      .doc('production')
      .onSnapshot(snap => {
        setFeatures(snap.data());
      });
    return () => getFeatures();
  }, []);
  React.useEffect(() => {
    const unsubscribe = () => {
      // setInitializing(true);
      NetInfo.addEventListener(state => {
        //console.log('Connection type', state.type);
        //console.log('Is connected?', state.isConnected);
        // networkState.current = state.isInternetReachable;
        setNetState(state.isConnected);
        // setInitializing(!state.isConnected);
      });
    };
    return unsubscribe();
  }, []);
  const MainHeader = ({title}: any) => (
    <>
      <View
        style={{
          height: height * 0.1,
          width: width,
          backgroundColor: colors.white,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
        }}>
        <Pressable
          onPress={() => {
            goBack();
          }}>
          <View style={{paddingRight: 5, paddingVertical: 5}}>
            <Entypo name="chevron-left" size={24} color={colors.brown} />
          </View>
        </Pressable>
        <Text
          style={{
            color: colors.logo_color,
            fontSize: 18,
            marginLeft: 20,
            fontWeight: '700',
          }}>
          {title.slice(0, 40)}
        </Text>
        <View style={{flexGrow: 1}} />
        <Pressable
          onPress={() => {
            navigation.navigate('Search', {
              isFoodSearch: true,
              id: id,
              collection: 'restaurants',
              address: address,
              name: name,
              isOpen: isOpen,
              foodList: searchList,
            });
          }}>
          <View style={{paddingRight: 5, paddingVertical: 5}}>
            <Feather name="search" size={24} color={colors.divider} />
          </View>
        </Pressable>
      </View>
      {!isOpen && (
        <View
          style={{
            paddingHorizontal: 14,
            paddingVertical: 4,
            backgroundColor: colors.divider,
            alignItems: 'center',
          }}>
          <Text style={{color: colors.white}}>
            {'The partner is currently not accepting orders'}
          </Text>
        </View>
      )}
      <FoodCategoryHeader
        categories={categories}
        activeTab={activeTab}
        onOptionClick={(title, index) => {
          onCategoryClick(title, index);
        }}
      />
    </>
  );
  if (initializing) return <Loader />;
  if (!netState) return <NoInternet />;
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#D17755"
        barStyle="light-content"
        translucent={true}
      />
      <View style={styles.root}>
        <FlatList
          data={tablist}
          ListHeaderComponent={() => <MainHeader title={name} />}
          keyExtractor={(item: any) => item?.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}: any) => (
            <Food
              isClosed={!isOpen}
              id={id}
              item={item}
              addToCardAction={() => {
                if (!Resouce?.restaurantDetails) {
                  Resouce?.saveRestaurantDetils({id, name, address});
                  openBottomSheet();
                } else {
                  if (
                    Resouce?.restaurantDetails &&
                    Resouce?.restaurantDetails?.id == id
                  ) {
                    openBottomSheet();
                  } else {
                    Alert.alert(
                      'You can only order from one Restaurant at a time',
                      '',
                      [{text: 'OK', onPress: () => {}}],
                    );
                  }
                }
              }}
              removeFromCardAction={() => {
                Resouce?.saveRestaurantDetils(null);
                closeBottomSheet();
              }}
            />
          )}
          stickyHeaderIndices={[0]}
          ListFooterComponent={<View style={{paddingBottom: 120}} />}
        />
        <View
          style={{
            width: '100%',
            backgroundColor: colors.white,
            position: 'absolute',
            bottom: 0,
            paddingTop: 20,
          }}>
          {isOpen && (
            <View style={{width: '100%', paddingHorizontal: 14}}>
              <Pressable
                style={{}}
                onPress={() => {
                  // console.log('TOTAL COST', Resouce?.getTotalCost());
                  if (
                    // trigger.current &&
                    Resouce &&
                    Resouce?.getTotalCost() >= features.minimum_order_price
                  )
                    navigation.navigate('BookOrder');
                  else {
                    Alert.alert(
                      `Menu item added is less than ₹ ${features.minimum_order_price} `,
                      '',
                      [
                        {
                          text: 'Ok',
                        },
                      ],
                    );
                  }
                }}>
                <View style={styles.gotoCartButton}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.white,
                    }}>
                    Proceed
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
          <View
            style={[
              styles.bottomTextContainer,
              isOpen ? {} : {backgroundColor: colors.divider},
            ]}>
            <Text
              style={
                styles.bottomText
              }>{`Minimum order amount ₹ ${features.minimum_order_price}`}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default ViewRestaurant;

const styles = StyleSheet.create({
  root: {
    // height: height,
    // width: width,
    paddingTop: 20,
    flex: 1,
  },
  bottomTextContainer: {
    marginTop: 10,
    paddingVertical: 3,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  gotoCartButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: colors.brown,
    borderRadius: 10,
  },
});
