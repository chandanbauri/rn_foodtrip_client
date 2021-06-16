import React, {useState} from 'react';
import {Dimensions, StyleSheet, View, Text, FlatList} from 'react-native';
import Food from '../../components/cards/food';
import FoodCategoryHeader from '../../components/header/foodCategory';
const {height, width} = Dimensions.get('window');

const RestaurantScreen = () => {
  const [activeList, setActiveList] = useState(foodObj[0].itemlist);
  const EmptyList = () => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>The List is Empty</Text>
    </View>
  );
  return (
    <View style={styles.root}>
      <FoodCategoryHeader />
      <FlatList
        data={activeList}
        renderItem={({item}) => <Food item={item} />}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  root: {flex: 1},
  foodList: {
    flex: 1,
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
        name: "M'Pepeporni",
      },
    ],
  },
  {
    categoryName: 'Pizza3',
    itemlist: [
      {
        name: "M'Pepeporni",
      },
    ],
  },
  {
    categoryName: 'Pizza4',
    itemlist: [
      {
        name: "M'Pepeporni",
      },
    ],
  },
];
