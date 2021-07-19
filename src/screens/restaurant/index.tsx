import * as React from 'react';
import {Dimensions, StyleSheet, View, Text, FlatList} from 'react-native';
import Food from '../../components/cards/food';
import FoodCategoryHeader from '../../components/header/foodCategory';
import RestaurantHeader from '../../components/header/Restaurant';
import {RestaurantScreenProps} from '../../navigation/homeScreenStackNavigator/types';
const {height, width} = Dimensions.get('window');

const RestaurantScreen = ({navigation, route}: RestaurantScreenProps) => {
  const [activeList, setActiveList] = React.useState<any>(foodObj[0].itemlist);
  const EmptyList = () => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>The List is Empty</Text>
    </View>
  );
  const onCategoryChange = (catName: string) => {
    let item = foodObj.find(({categoryName}) => categoryName == catName);
    setActiveList(() => item?.itemlist);
  };
  React.useEffect(() => {
    navigation.setOptions({
      header: props => <RestaurantHeader {...props} title="Domino's" />,
    }); // will be title of the Restaurant.
  }, []);
  return (
    <View style={styles.root}>
      <FoodCategoryHeader onOptionClick={onCategoryChange} />
      <FlatList
        data={activeList}
        renderItem={({item}) => <Food item={item} />}
        ListEmptyComponent={EmptyList}
      />
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>{`Minimum order For 350 for one`}</Text>
      </View>
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  root: {flex: 1},
  foodList: {
    flex: 1,
  },
  bottomTextContainer: {
    paddingVertical: 2,
    backgroundColor: '#21BF73',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
});

const foodObj = [
  {
    categoryName: 'Pizza',
    itemlist: [
      {
        id: 1,
        name: "M'Pepeporni",
      },
      {
        id: 2,
        name: "M'Pepeporni",
      },
      {
        id: 3,
        name: "M'Pepeporni",
      },
      {
        id: 4,
        name: "M'Pepeporni",
      },
      {
        id: 5,
        name: "M'Pepeporni",
      },
      {
        id: 6,
        name: "M'Pepeporni",
      },
      {
        id: 7,
        name: "M'Pepeporni",
      },
      {
        id: 8,
        name: "M'Pepeporni",
      },
      {
        id: 9,
        name: "M'Pepeporni",
      },
      {
        id: 10,
        name: "M'Pepeporni",
      },
    ],
  },
  {
    categoryName: 'Pizza1',
    itemlist: [{id: 1, name: "M'Pepeporni"}],
  },
  {
    categoryName: 'Pizza2',
    itemlist: [
      {
        id: 1,
        name: "M'Pepeporni",
      },
    ],
  },
  {
    categoryName: 'Pizza3',
    itemlist: [
      {
        id: 1,
        name: "M'Pepeporni",
      },
    ],
  },
  {
    categoryName: 'Pizza4',
    itemlist: [{id: 1, name: "M'Pepeporni"}],
  },
];
