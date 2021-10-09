import {
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Pressable} from 'react-native';
import Account from '../../screens/account/Account';
import {colors} from '../../utilities';
import OrderNavigator from '../orderNavigator';
import {CombinedNavigationProp} from '../types';
import Feather from 'react-native-vector-icons/Feather';
import {OrderScreenParamlist} from '../orderNavigator/OrderNavigator';
export type OrderStackParamlist = {
  Orders: NavigatorScreenParams<OrderScreenParamlist>;
};

const Stack = createStackNavigator<OrderStackParamlist>();
export default function OrderStackNavigator() {
  const navigation = useNavigation<CombinedNavigationProp>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Orders" component={Account} /> */}
      <Stack.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          headerShown: true,
          headerTitleStyle: {color: colors.logo_color},
          //   headerLeft: () => (
          //     <Pressable
          //       onPress={() => {
          //         navigation.navigate('Profile');
          //       }}>
          //       <Feather name="chevron-left" size={24} color={colors.brown} />
          //     </Pressable>
          //   ),
          headerLeftContainerStyle: {marginLeft: 10},
          headerTitle: 'My Orders',
          headerStyle: {
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
}
