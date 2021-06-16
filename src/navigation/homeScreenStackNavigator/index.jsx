import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/home';
import Search from '../../screens/home/search';
import RestaurantScreen from '../../screens/restaurant';
import BottomNavigator from '../bottomTabNavigator';
const Stack = createStackNavigator();
const HomeScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerTitle: ''}}
      />
      <Stack.Screen name="ViewRestaurant" component={RestaurantScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
