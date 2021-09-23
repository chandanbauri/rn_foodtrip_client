import {RouteProp, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Pressable} from 'react-native';
import Account from '../../screens/account/Account';
import {colors} from '../../utilities';
import OrderNavigator from '../orderNavigator';
import {CombinedNavigationProp} from '../types';
import Feather from 'react-native-vector-icons/Feather';
import EditProfileScreen from '../../screens/account/edit';
export type AccountNavigatorParamlist = {
  Profile: undefined;
  EditProfile: undefined;
};
export type AccountScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<AccountNavigatorParamlist, 'Profile'>;
};
export type EditProfileProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<AccountNavigatorParamlist, 'Profile'>;
};

const Stack = createStackNavigator<AccountNavigatorParamlist>();
export default function AccountNavigator() {
  const navigation = useNavigation<CombinedNavigationProp>();
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Account} />
      {/* <Stack.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          headerShown: true,
          headerTitleStyle: {color: colors.brown},
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Feather name="chevron-left" size={24} color={colors.brown} />
            </Pressable>
          ),
          headerLeftContainerStyle: {marginLeft: 10},
          headerTitle: 'My Orders',
          headerStyle: {
            elevation: 0,
          },
        }}
      /> */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerTitleStyle: {
            color: colors.brown,
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Feather name="chevron-left" size={24} color={colors.brown} />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
