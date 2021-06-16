import React from 'react';
import {StyleSheet, View, ScrollView, FlatList} from 'react-native';
import Restaurant from '../../cards/Restaurant';
import Food from '../../cards/food';

const RestaurantScrollView = ({isRestaurant}) => {
  const data = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ];
  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        renderItem={props =>
          isRestaurant ? <Restaurant /> : <Food item={props} />
        }
      />
    </View>
  );
};

export default RestaurantScrollView;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#BBBBBB30',
    paddingTop: 5,
  },
});
