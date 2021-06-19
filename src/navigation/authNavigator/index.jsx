import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ResourceProvider} from '../../contexts/resource';
import HomeScreenStack from '../homeScreenStackNavigator';
import {AuthContextProvider} from '../../contexts/Auth';
import VerificationScreen from '../../screens/account/verify';
const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthContextProvider>
      <ResourceProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={HomeScreenStack} />
          <Stack.Screen name="verifyScreen" component={VerificationScreen}     />
        </Stack.Navigator>
      </ResourceProvider>
    </AuthContextProvider>
  );
};

export default AuthNavigator;
