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
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Restaurant from '../../components/cards/Restaurant';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import BSAddressComp from '../../components/bottomSheet/addressComp';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {LocationContext} from '../../contexts/location';
import {HomeScreenProps} from '../../navigation/bottomTabNavigator/types';
import {colors} from '../../utilities';
import functions from '@react-native-firebase/functions';
import {getMenuList, getRestaurantList} from '../../utilities/cloud/functions';
import {ResourceContext} from '../../contexts/resource';
import {CategoryCard} from '../../components/cards/category';
import {useIsFocused} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
const Home = ({navigation, route}: HomeScreenProps) => {
  // const Location = React.useContext(LocationContext);
  let isFocused = useIsFocused();
  const Resource = React.useContext(ResourceContext);
  const [initializing, setInitializing] = React.useState<boolean>(true);
  // const MAX_BOTTOMSHEET_HEIGHT = 480;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <Feather name="search" size={25} color={colors.brown} />
        </TouchableOpacity>
      ),
    });
  });

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
  let category = [1, 2, 3, 4, 5, 6, 7, 6, 7];
  const ListHeader = () => (
    <>
      <View style={styles.categoryListContainer}>
        <View style={styles.categoryListHeaderContainer}>
          <Text style={styles.categoryListHeader}>Categories</Text>
        </View>
        <View style={styles.categoryList}>
          <FlatList
            horizontal={true}
            keyExtractor={(item, index) => `${index}`}
            data={Resource?.menuList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <CategoryCard name={item.name} />}
          />
        </View>
      </View>
      <View style={styles.ListHeader}>
        <Text style={styles.ListHeaderTitle}>Restaurants Around You</Text>
      </View>
    </>
  );
  if (initializing)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color={colors.brown} size="large" />
      </View>
    );
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

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
                navigation.navigate('Restaurant', {
                  id: item.id,
                  collection: 'restaurants',
                  address: item.address,
                  name: item.restaurantName,
                });
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
