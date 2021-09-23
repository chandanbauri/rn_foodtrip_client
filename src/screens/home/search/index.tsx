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
import {ResourceContext, ResourceProvider} from '../../../contexts/resource';
import {SearchScreenProps} from '../../../navigation/homeScreenStackNavigator/types';
import {colors, isAvailable} from '../../../utilities';
import {
  getMenuList,
  getRestaurantList,
} from '../../../utilities/cloud/functions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');
const Search = ({navigation}: SearchScreenProps) => {
  const Resource = React.useContext(ResourceContext);
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [results, setResults] = React.useState<Array<any>>([]);
  const textVal = React.useRef<string>('');
  // let results = React.useRef<Array<any>>([]);
  const ref = React.createRef<TextInput>();
  let isFocused = useIsFocused();
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
  const onTextChange = (text: string) => {
    if (ref.current) ref.current.focus();

    textVal.current = text;
  };
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
            placeholder="Search your favourite Restaurant"
            placeholderTextColor={colors.brown}
            style={styles.searchBarTextInput}
            onChangeText={onTextChange}
          />
        </View>
      </View>
    </View>
  );

  if (initializing) return <Loader />;
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#FFF"
        barStyle="dark-content"
        translucent={true}
      />
      {Resource && Resource.restaurantList && Resource.restaurantList.length ? (
        <>
          <FlatList
            data={results}
            keyExtractor={(item, index) => `${index}`}
            ListHeaderComponent={<ListHeader />}
            stickyHeaderIndices={[0]}
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
            ListFooterComponent={() => <View style={{paddingBottom: 120}} />}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 0,
              right: 0,
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
                let list = Resource?.restaurantList?.filter((res: any) =>
                  res.restaurantName
                    .toLowerCase()
                    .includes(textVal.current.toLocaleLowerCase()),
                );
                setResults(list);
              }}>
              <Text style={{color: colors.white}}>Search</Text>
            </Pressable>
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
    color: colors.brown
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
});
