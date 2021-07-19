import * as React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import RestaurantScrollView from '../../../components/scrollview/restaurant';
import {ResourceContext, ResourceProvider} from '../../../contexts/resource';
import {SearchScreenProps} from '../../../navigation/homeScreenStackNavigator/types';
const {width} = Dimensions.get('window');
const Search = ({navigation}: SearchScreenProps) => {
  const Resource = React.useContext(ResourceContext);
  const [isViewingRestaurant, setViewingRestaurant] =
    React.useState<boolean>(true);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={styles.headerBackButton}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Feather name="arrow-left" size={24} color="#21BF73" />
        </Pressable>
      ),
    });
  });
  return (
    <View style={styles.root}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search your favourite Food or Restaurant"
            placeholderTextColor="#21BF73"
            style={styles.searchBarTextInput}
          />
        </View>
      </View>
      <View style={styles.filterContainer}>
        <Pressable
          style={[
            styles.filterOptions,
            isViewingRestaurant
              ? styles.filterOptionsFocused
              : styles.filterOptionsNotFocused,
          ]}
          onPress={() => {
            setViewingRestaurant(prev => !prev);
          }}>
          <Text
            style={[
              styles.filterOptionsText,
              isViewingRestaurant
                ? styles.filterOptionsTextFocused
                : styles.filterOptionsTextNotFocused,
            ]}>
            Restaurant
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterOptions,
            isViewingRestaurant
              ? styles.filterOptionsNotFocused
              : styles.filterOptionsFocused,
          ]}
          onPress={() => {
            setViewingRestaurant(prev => !prev);
          }}>
          <Text
            style={[
              styles.filterOptionsText,
              isViewingRestaurant
                ? styles.filterOptionsTextNotFocused
                : styles.filterOptionsTextFocused,
            ]}>
            Food
          </Text>
        </Pressable>
      </View>
      <RestaurantScrollView isRestaurant={isViewingRestaurant} />
    </View>
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
    width: width,
    paddingHorizontal: 14,
  },
  searchBar: {
    borderWidth: 2,
    borderColor: '#21BF73',
    width: '100%',
    marginTop: 2,
  },
  searchBarTextInput: {
    paddingLeft: 10,
  },
  filterContainer: {
    marginTop: 20,
    width: width,
    borderBottomWidth: 2,
    borderBottomColor: '#21BF73',
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
    backgroundColor: '#21BF73',
  },
  filterOptionsNotFocused: {
    borderColor: '#21BF73',
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
    color: '#21BF73',
  },
});
