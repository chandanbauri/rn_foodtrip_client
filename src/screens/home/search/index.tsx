import {useIsFocused} from '@react-navigation/core';
import * as React from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Restaurant from '../../../components/cards/Restaurant';
import Loader from '../../../components/loader/loader';
import FocusedStatusBar from '../../../components/statusBar';
import {
  ResourceContext,
  ResourceProvider,
  useResource,
} from '../../../contexts/resource';
import {SearchScreenProps} from '../../../navigation/homeScreenStackNavigator/types';
import {colors, isAvailable} from '../../../utilities';
import {
  getFeatures,
  getMenuList,
  getRestaurantList,
} from '../../../utilities/cloud/functions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import Food from '../../../components/cards/food';
import NoInternet from '../../../components/NoInternet';
const {width, height} = Dimensions.get('window');
const Search = ({navigation, route}: SearchScreenProps) => {
  const [netState, setNetState] = React.useState<any>(null);
  const Resource = React.useContext(ResourceContext);
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [features, setFeatures] = React.useState<any>({});
  const [results, setResults] = React.useState<Array<any>>([]);
  const textVal = React.useRef<string>('');
  let trigger = React.useRef(false);
  let Resouce = useResource();
  const {isFoodSearch, isOpen, collection, id, name, address, foodList} =
    route.params;
  // let results = React.useRef<Array<any>>([]);
  const ref = React.createRef<TextInput>();
  let isFocused = useIsFocused();
  const openBottomSheet = () => {
    trigger.current = true;
  };
  const closeBottomSheet = () => {
    trigger.current = false;
  };
  const getList = async () => {
    if (isFocused && !isFoodSearch)
      try {
        setInitializing(true);
        let res = await getRestaurantList();
        let menuRes = await getMenuList();
        let menu = JSON.parse(menuRes.data);
        let restaurants = JSON.parse(res.data);

        if (restaurants.length) {
          Resource?.setRestaurants(restaurants);
        }
        if (menu.length) {
          Resource?.setMenu(menu);
        }
        setInitializing(false);
      } catch (error) {
        // //console.log(error);
      }
  };
  const onTextChange = (text: string) => {
    if (ref.current) ref.current.focus();

    textVal.current = text;
  };
  const fetchFeatures = async () => {
    try {
      setInitializing(true);
      let res = await getFeatures();
      if (res) {
        let data = res.data;
        // //console.log(data);
        setFeatures(data);
        setInitializing(false);
      }
    } catch (error) {
      setInitializing(false);
      throw error;
    }
  };
  React.useEffect(() => {
    if (isFocused)
      fetchFeatures().catch(error => {
        throw error;
      });
  }, []);
  React.useEffect(() => {
    if (isFocused)
      getList().catch(error => {
        throw error;
      });
    return;
  }, []);
  const ListHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.08,
        backgroundColor: '#FFF',
      }}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <TextInput
            ref={ref}
            placeholder={`Search your favourite ${
              isFoodSearch ? 'Food' : 'Restaurant'
            }`}
            placeholderTextColor={colors.brown}
            style={styles.searchBarTextInput}
            onChangeText={onTextChange}
          />
        </View>
      </View>
    </View>
  );
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
  console.log(results);
  if (initializing) return <Loader />;
  if (!netState) return <NoInternet />;
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#D17755"
        barStyle="light-content"
        translucent={true}
      />
      {Resource && Resource.restaurantList && Resource.restaurantList.length ? (
        <>
          <FlatList
            data={!isFoodSearch ? results : foodList}
            keyExtractor={(item, index) => `${index}`}
            ListHeaderComponent={<ListHeader />}
            stickyHeaderIndices={[0]}
            renderItem={({item, index: number}) =>
              isFoodSearch ? (
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
              ) : (
                <Restaurant
                  onClick={() => {
                    if (item.opening && isAvailable(item.opening, item.closing))
                      navigation.navigate('Restaurant', {
                        id: item.id,
                        collection: 'restaurants',
                        address: item.address,
                        name: item.restaurantName,
                        isOpen: true,
                      });
                    else {
                      navigation.navigate('Restaurant', {
                        id: item.id,
                        collection: 'restaurants',
                        address: item.address,
                        name: item.restaurantName,
                        isOpen: false,
                      });
                    }
                  }}
                  values={item}
                />
              )
            }
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {textVal.current == '' ? (
                  <Text style={{marginTop: 250, color: colors.brown}}>
                    {isFoodSearch
                      ? `Welcome to ${name}`
                      : `Search your favourite Restaurants`}
                  </Text>
                ) : (
                  <Text style={{marginTop: 250, color: colors.brown}}>
                    No results available
                  </Text>
                )}
              </View>
            )}
            ListFooterComponent={() => <View style={{paddingBottom: 200}} />}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}>
            {isOpen && isFoodSearch && (
              <View
                style={{
                  width: '100%',
                  marginBottom: 10,
                  paddingHorizontal: 10,
                }}>
                <Pressable
                  style={{}}
                  onPress={() => {
                    if (
                      trigger.current &&
                      Resouce &&
                      Resouce?.getTotalCost() >= features.minimum_order_price
                    )
                      navigation.navigate('BookOrder');
                    else {
                      Alert.alert(
                        `The minimum order price is ₹ ${features.minimum_order_price} INR`,
                        '',
                        [
                          {
                            text: 'Ok',
                          },
                        ],
                      );
                    }
                  }}>
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: 15,
                      backgroundColor: colors.brown,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}>
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
              style={{
                width: '100%',
                paddingHorizontal: 10,
              }}>
              <Pressable
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  backgroundColor: colors.brown,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}
                onPress={() => {
                  if (!isFoodSearch) {
                    let list = Resource?.restaurantList?.filter((res: any) =>
                      res.restaurantName
                        .toLowerCase()
                        .includes(textVal.current.toLocaleLowerCase()),
                    );
                    setResults(list);
                    return;
                  }
                  if (isFoodSearch && foodList) {
                    let list = foodList.filter((res: any) =>
                      res.name
                        .toLowerCase()
                        .includes(textVal.current.toLocaleLowerCase()),
                    );
                    setResults(list);
                  }
                }}>
                <Text style={{color: colors.white}}>Search</Text>
              </Pressable>
            </View>
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
        </>
      ) : (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              // height: height * 0.5,
              width: '100%',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: colors.white,
            }}>
            <Ionicons name="fast-food" size={60} color={colors.brown} />
            <View
              style={{
                padding: 10,
                borderLeftColor: colors.brown,
                borderLeftWidth: 2,
                flexDirection: 'column',
                marginLeft: 10,
              }}>
              <Text style={styles.emptyText}>Restaurants will</Text>
              <Text style={styles.emptyText}>be available</Text>
              <Text style={styles.emptyText}>shortly</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackButton: {
    marginLeft: 14,
  },
  searchBarContainer: {
    flexGrow: 1,
    paddingHorizontal: 14,
  },
  searchBar: {
    borderWidth: 2,
    borderColor: colors.brown,
    width: '100%',
    marginTop: 2,
    borderRadius: 8,
  },
  searchBarTextInput: {
    paddingLeft: 10,
    color: colors.brown,
  },
  filterContainer: {
    marginTop: 20,
    width: width,
    borderBottomWidth: 2,
    borderBottomColor: colors.brown,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 14,
  },
  filterOptions: {
    height: 30,
    width: 90,
    borderRadius: 50,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  filterOptionsFocused: {
    backgroundColor: colors.brown,
  },
  filterOptionsNotFocused: {
    borderColor: colors.brown,
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  filterOptionsText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
  },
  filterOptionsTextFocused: {
    color: '#fff',
  },
  filterOptionsTextNotFocused: {
    color: colors.brown,
  },
  restaurantListContainer: {
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  emptyText: {
    color: colors.brown,
    fontSize: 18,
    fontWeight: 'bold',
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
});
