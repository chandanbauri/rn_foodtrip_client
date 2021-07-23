import * as React from 'react';
import {StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import Food from '../../components/cards/food';
import {ResourceContext} from '../../contexts/resource';
import {CartScreenProps} from '../../navigation/bottomTabNavigator/types';

function Cart({navigation}: CartScreenProps) {
  const Auth = React.useContext(ResourceContext);

  if (Auth?.cart.length) {
    return (
      <View style={styles.root}>
        <FlatList
          data={Auth?.cart}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Food item={item} />}
        />
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <EmptyCart />
    </View>
  );
}

export default Cart;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartText: {
    color: '#21BF73',
    fontSize: 12,
  },
  visitNearByRestaurantButton: {
    borderWidth: 2,
    borderColor: '#21BF73',
    paddingVertical: 12,
    paddingHorizontal: 35,
    marginTop: 10,
  },
  visitNearByRestaurantButtonText: {
    color: '#21BF73',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

const EmptyCart = () => (
  <View style={styles.emptyCartContainer}>
    <View style={{alignItems: 'center', marginTop: 100}}>
      <Text style={styles.emptyCartText}>{`Your cart is empty`}</Text>
      <Text style={styles.emptyCartText}>{`Add something from the menu`}</Text>
      <Pressable style={styles.visitNearByRestaurantButton} onPress={() => {}}>
        <Text
          style={
            styles.visitNearByRestaurantButtonText
          }>{`Check out near by Restaurants`}</Text>
      </Pressable>
    </View>
  </View>
);
