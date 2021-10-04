import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import Restaurant from '../../components/cards/Restaurant';
import {HomeScreenProps} from '../../navigation/bottomTabNavigator/types';
import {colors, isAvailable} from '../../utilities';
import {
  fetchBanner,
  getMenuList,
  getRestaurantList,
} from '../../utilities/cloud/functions';
import {ResourceContext} from '../../contexts/resource';
import {useIsFocused} from '@react-navigation/native';
import FocusedStatusBar from '../../components/statusBar';
import Loader from '../../components/loader/loader';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {height, width} = Dimensions.get('window');
const Home = ({navigation, route}: HomeScreenProps) => {
  // const Location = React.useContext(LocationContext);
  let isFocused = useIsFocused();
  const Resource = React.useContext(ResourceContext);
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [banners, setBanners] = React.useState<any>([]);
  const ref = React.useRef(null);
  const getPromotionBanners = async () => {
    try {
      let res = await fetchBanner();
      if (res && isFocused) {
        let parseddata = JSON.parse(res.data);
        let {files} = parseddata;
        let bannerLinks = files[0].map((item: any, index: number) => {
          // for (let key in item.metadata) {
          //   console.log('META DATA', key, ' : ', item.metadata[key]);
          // }
          // // 'https://firebasestorage.googleapis.com/v0/b/foodadda3-3aeca.appspot.com/o/promotions%2Flogo.png?alt=media&token=aa253456-7767-4c0d-a709-3c76761ebc6d'
          // console.log('FILE', index);
          return `https://firebasestorage.googleapis.com/v0/b/${
            item.metadata.bucket
          }/o/${item.metadata.name.replace('/', '%2F')}?alt=media&token=${
            item.metadata.metadata.firebaseStorageDownloadTokens
          }`;
        });
        let reg = new RegExp('promotions');
        setBanners(bannerLinks.filter((item: string) => reg.test(item)));
      }
    } catch (error) {
      throw error;
    }
  };

  const getList = async () => {
    if (isFocused)
      try {
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
        // console.log(error);
      }
  };
  React.useEffect(() => {
    if (isFocused)
      getList().catch(error => {
        throw error;
      });
    return;
  }, []);
  React.useEffect(() => {
    if (isFocused)
      getPromotionBanners().catch(error => {
        throw error;
      });
    return;
  }, []);
  const Banner = ({url}: any) => {
    return (
      <View
        style={{
          width: '100%',
          overflow: 'hidden',
          paddingHorizontal: 14,
        }}>
        <Image
          source={{uri: url}}
          style={{width: '100%', height: 200, borderRadius: 10}}
        />
      </View>
    );
  };
  const ListHeader = () => (
    <>
      <View style={styles.categoryListContainer}>
        {/* <View style={styles.categoryListHeaderContainer}>
          <Text style={styles.categoryListHeader}>Categories</Text>
        </View> */}
        <View style={styles.categoryList}>
          {/* <FlatList
            horizontal={true}
            keyExtractor={(item, index) => `${index}`}
            data={Resource?.menuList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <CategoryCard name={item.name} />}
          /> */}

          <Carousel
            ref={ref}
            data={banners}
            renderItem={({item, index}) => <Banner url={item} />}
            horizontal={true}
            windowSize={width}
            itemWidth={width}
            autoplayDelay={2000}
            autoplay={true}
            maxToRenderPerBatch={1}
            sliderWidth={width}
          />
        </View>
      </View>

      <View style={styles.ListHeader}>
        <Text style={styles.ListHeaderTitle}>Restaurants Around You</Text>
      </View>
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
      <SafeAreaView style={styles.root}>
        {/* <View style={styles.addressViewContainer}>
        <TouchableOpacity
          style={styles.addressView}
          onPress={() => {
            OpenBottomSheet();
          }}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={24}
            color={colors.brown}
          />
          <View style={styles.addressViewTextContainer}>
            <Text style={styles.addressViewText}>Road 5 , Asansol</Text>
          </View>
        </TouchableOpacity>
      </View> */}

        <View style={styles.restaurantListContainer}>
          {Resource &&
          Resource.restaurantList &&
          Resource.restaurantList.length ? (
            <FlatList
              data={Resource?.restaurantList}
              keyExtractor={(item, index) => `${index}`}
              ListHeaderComponent={<ListHeader />}
              renderItem={({item, index: number}) => (
                <Restaurant
                  onClick={() => {
                    if (item.opening && isAvailable(item.opening, item.closing))
                      navigation.navigate('Restaurant', {
                        id: item.id,
                        collection: 'restaurants',
                        address: item.address,
                        name: item.restaurantName,
                      });
                    else {
                      Alert.alert(
                        'Opps',
                        'This Restaurant is not accepting Orders for now',
                      );
                    }
                  }}
                  values={item}
                />
              )}
            />
          ) : (
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  // height: height * 0.5,
                  // width: '100%',
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
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchButton: {
    marginRight: 15,
  },
  addressViewContainer: {
    width: '100%',
    paddingLeft: 14,
    marginTop: 10,
  },
  addressView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressViewTextContainer: {
    marginLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.brown,
    paddingBottom: 5,
  },
  addressViewText: {
    color: colors.brown,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
  },
  categoryListContainer: {
    width: '100%',
  },
  categoryListHeaderContainer: {
    marginTop: 35,
    marginLeft: 18,
  },
  categoryListHeader: {
    color: colors.brown,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
  },
  categoryList: {
    backgroundColor: colors.white,
    width: '100%',
    paddingVertical: 30,
    flexDirection: 'row',
  },
  restaurantListContainer: {
    marginTop: 10,
    backgroundColor: colors.white,
  },
  ListHeader: {
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 14,
    backgroundColor: colors.white,
  },
  ListHeaderTitle: {
    color: colors.brown,
    fontWeight: '700',
    fontSize: 20,
  },
  emptyText: {
    color: colors.brown,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
