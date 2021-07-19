import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Restaurant from '../../components/cards/Restaurant';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import BSAddressComp from '../../components/bottomSheet/addressComp';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {LocationContext} from '../../contexts/location';
import {HomeScreenProps} from '../../navigation/bottomTabNavigator/types';
const Home = ({navigation, route}: HomeScreenProps) => {
  const Location = React.useContext(LocationContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <Feather name="search" size={25} color="#21BF73" />
        </TouchableOpacity>
      ),
    });
  });

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['25%', '80%'], []);

  const handleSheetChanges = React.useCallback(
    (fromIndex, toIndex) => fromIndex == 1 && bottomSheetRef.current?.close(),
    [],
  );

  const OpenBottomSheet = () => bottomSheetRef.current?.expand();

  React.useEffect(() => {
    Location?.currentLocation == null && OpenBottomSheet();
  }); // An Intital check for The Location

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <ScrollView>
        <View style={styles.addressViewContainer}>
          <TouchableOpacity
            style={styles.addressView}
            onPress={() => {
              OpenBottomSheet();
            }}>
            <MaterialCommunityIcons name="map-marker-radius" size={24} />
            <View style={styles.addressViewTextContainer}>
              <Text style={styles.addressViewText}>Road 5 , Asansol</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryListContainer}>
          <View style={styles.categoryListHeaderContainer}>
            <Text style={styles.categoryListHeader}>Categories</Text>
          </View>
          <View style={styles.categoryList}>
            {/* restaurant cards goes here only the closest ones */}
          </View>
        </View>
        <View style={styles.restaurantListContainer}>
          <Restaurant
            onClick={() => {
              navigation.navigate('Restaurant');
            }}
            values="any"
          />
          <Restaurant
            onClick={() => {
              navigation.navigate('Restaurant');
            }}
            values="any"
          />
          <Restaurant
            onClick={() => {
              navigation.navigate('Restaurant');
            }}
            values="any"
          />
          <Restaurant
            onClick={() => {
              navigation.navigate('Restaurant');
            }}
            values="any"
          />
          <Restaurant
            onClick={() => {
              navigation.navigate('Restaurant');
            }}
            values="any"
          />
          <Restaurant
            onClick={() => {
              navigation.navigate('Restaurant');
            }}
            values="any"
          />
        </View>
      </ScrollView>
      <BottomSheet
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
      </BottomSheet>
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
    borderBottomColor: '#21BF73',
    paddingBottom: 5,
  },
  addressViewText: {
    color: '#21BF73',
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
    color: '#929AAB',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  categoryList: {
    backgroundColor: '#21BF7325',
    height: 200,
    width: '100%',
    marginTop: 10,
  },
  restaurantListContainer: {
    marginTop: 10,
    backgroundColor: '#bbbbbb30',
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
