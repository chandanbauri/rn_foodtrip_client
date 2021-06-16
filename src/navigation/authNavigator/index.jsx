import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ResourceProvider} from '../../contexts/resource';
import BottomNavigator from '../bottomTabNavigator';
import HomeScreenStack from '../homeScreenStackNavigator';
const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <ResourceProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={HomeScreenStack} />
      </Stack.Navigator>
    </ResourceProvider>
  );
};

export default AuthNavigator;
