import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Restaurant from '../../components/cards/Restaurant';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import BSAddressComp from '../../components/bottomSheet/addressComp';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {LocationContext} from '../../contexts/location';
import {HomeScreenProps} from '../../navigation/bottomTabNavigator/types';
import {colors, isAvailable} from '../../utilities';
import functions from '@react-native-firebase/functions';
import {
  fetchBanner,
  getMenuList,
  getRestaurantList,
} from '../../utilities/cloud/functions';
import {ResourceContext} from '../../contexts/resource';
import {CategoryCard} from '../../components/cards/category';
import {useIsFocused} from '@react-navigation/native';
import FocusedStatusBar from '../../components/statusBar';
import Loader from '../../components/loader/loader';
import Carousel from 'react-native-snap-carousel';
import {cos} from 'react-native-reanimated';
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
      if (res) {
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
  // const MAX_BOTTOMSHEET_HEIGHT = 480;
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         style={styles.searchButton}
  //         onPress={() => {
  //           navigation.navigate('Search');
  //         }}>
  //         <Feather name="search" size={25} color={colors.brown} />
  //       </TouchableOpacity>
  //     ),
  //   });
  // });

  // const bottomSheetRef = React.useRef<BottomSheet>(null);
  // const snapPoints = React.useMemo(
  //   () => [height * 0.25, MAX_BOTTOMSHEET_HEIGHT],
  //   [],
  // );

  // const handleSheetChanges = React.useCallback(
  //   (fromIndex, toIndex) => fromIndex == 1 && bottomSheetRef.current?.close(),
  //   [],
  // );

  // const OpenBottomSheet = () => bottomSheetRef.current?.expand();

  // React.useEffect(() => {
  //   Location?.currentLocation == null && OpenBottomSheet();
  // }); // An Intital check for The Location

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
        throw error;
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
        backgroundColor="transparent"
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
        </View>

        {/* <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onAnimate={handleSheetChanges}
        keyboardBehavior="fullScreen"
        keyboardBlurBehavior="restore"
        backdropComponent={props => <BottomSheetBackdrop {...props} />}>
        <BottomSheetScrollView>
          <BSAddressComp />
        </BottomSheetScrollView>
      </BottomSheet> */}
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
});

const RestaurantList = [
  {
    Name: "Domino's",
    tags: ['indian', 'Chinese'],
    address: {
      text: 'Road 5 , Dishergarh , Asansol , Barddhaman , 713333',
      coords: {
        lat: 82.332,
        lng: 35.003,
      },
    },
  },
];
