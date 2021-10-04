import * as React from 'react';
import {Alert, Dimensions, Pressable, StyleSheet} from 'react-native';
import {Text, View, FlatList} from 'react-native';
import Food from '../../components/cards/food';
import FocusedStatusBar from '../../components/statusBar';
import {RestaurantScreenProps} from '../../navigation/homeScreenStackNavigator/types';
import {colors} from '../../utilities';
import {useResource} from '../../contexts/resource';
import {getFoodList} from '../../utilities/cloud/functions';
import Entypo from 'react-native-vector-icons/Entypo';
import FoodCategoryHeader from '../../components/header/foodCategory';
import Loader from '../../components/loader/loader';
import {useIsFocused} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');

function ViewRestaurant({navigation, route}: RestaurantScreenProps) {
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [categories, setCategories] = React.useState<Array<any>>([]);
  const [activeTab, setActiveTab] = React.useState<number>(1);
  let trigger = React.useRef(false);
  let Resouce = useResource();
  const [foodList, setFoodList] = React.useState<Array<any>>([]);
  const tablist = React.useRef<Array<any>>([]);
  const {collection, id, name, address} = route.params;
  let isFocused = useIsFocused();
  const goBack = () => {
    navigation.navigate('Home');
  };

  const openBottomSheet = () => {
    trigger.current = true;
  };
  const closeBottomSheet = () => {
    trigger.current = false;
  };

  const extractCategories = (list: Array<any>) => {
    let raw = list.map(item => item.category);
    return [...new Set(raw)];
  };
  const fetchFoodList = async () => {
    try {
      let res = await getFoodList({parentName: collection, parentID: id});
      if (res && res.data && isFocused) {
        let list = JSON.parse(res.data);
        let catList = extractCategories(list);
        setFoodList(list);
        setCategories(catList);
        let items = list.filter((item: any) => item.category == catList[0]);
        setActiveTab(0);
        // setTabList(items);
        tablist.current = items;
        setInitializing(false);
      }
    } catch (error) {
      // throw error;
      console.log(error);
    }
  };

  const onCategoryClick = (categoryName: string, index: number) => {
    let list = foodList.filter(item => item.category == categoryName);
    setActiveTab(index);
    tablist.current = list;
  };

  React.useEffect(() => {
    if (isFocused)
      fetchFoodList().catch(error => {
        throw error;
      });
    return;
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
            color: colors.brown,
            fontSize: 18,
            marginLeft: 20,
            fontWeight: '700',
          }}>
          {title.slice(0, 40)}
        </Text>
      </View>
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
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#FFF"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={styles.root}>
        <FlatList
          data={tablist.current}
          ListHeaderComponent={() => <MainHeader title={name} />}
          keyExtractor={(item: any) => item?.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}: any) => (
            <Food
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
          <View style={{width: '100%', paddingHorizontal: 14}}>
            <Pressable
              style={{}}
              onPress={() => {
                if (
                  trigger.current &&
                  Resouce &&
                  Resouce?.getTotalCost() >= 150
                )
                  navigation.navigate('BookOrder');
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
          <View style={styles.bottomTextContainer}>
            <Text
              style={styles.bottomText}>{`Minimum order amount ₹ 150`}</Text>
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
