import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ResourceProvider} from '../../contexts/resource';
import HomeScreenStack from '../homeScreenStackNavigator';
import {AuthContextProvider} from '../../contexts/Auth';
import VerificationScreen from '../../screens/account/verify';
import {LocationProvider} from '../../contexts/location';
import {AuthNavigatorParamList} from './types';
const Stack = createStackNavigator<AuthNavigatorParamList>();
const AuthNavigator = () => {
  return (
    <AuthContextProvider>
      <ResourceProvider>
        <LocationProvider>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={HomeScreenStack} />
            <Stack.Screen name="Verify" component={VerificationScreen} />
          </Stack.Navigator>
        </LocationProvider>
      </ResourceProvider>
    </AuthContextProvider>
  );
};

export default AuthNavigator;
