import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from '../../screens/cart';
import ProceedingScreen from '../../screens/cart/Porceeding';
import {BookOrderParamList} from './types';
const Stack = createStackNavigator<BookOrderParamList>();

export default function BookOrderNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Proceed" component={ProceedingScreen} />
    </Stack.Navigator>
  );
}
