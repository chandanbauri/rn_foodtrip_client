import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OnGoingOrdersScreen from '../../screens/account/orders/ongoing';
import PendingOrdersScreen from '../../screens/account/orders/pending';
import RejectedOrderScreen from '../../screens/account/orders/rejected';
import {RouteProp} from '@react-navigation/native';
import {CombinedNavigationProp} from '../types';
import {colors} from '../../utilities';
import CompleteOrdersScreen from '../../screens/account/orders/complete';
export type OrderScreenParamlist = {
  ongoing: undefined;
  pending: undefined;
  rejected: undefined;
  completed: undefined;
};

export type OnGoingOrdersScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<OrderScreenParamlist, 'ongoing'>;
};

export type PendingOrdersScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<OrderScreenParamlist, 'pending'>;
};
export type RejectedOrdersScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<OrderScreenParamlist, 'rejected'>;
};
export type CompletedOrdersScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<OrderScreenParamlist, 'completed'>;
};
const Tab = createMaterialTopTabNavigator<OrderScreenParamlist>();

export default function OrderNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.brown,
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 12,
          textTransform: 'capitalize',
        },
        tabBarIndicatorStyle: {
          borderColor: colors.brown,
          backgroundColor: colors.brown,
        },
        tabBarBounces: true,
        tabBarAllowFontScaling: true,
      }}>
      <Tab.Screen name="ongoing" component={OnGoingOrdersScreen} />
      <Tab.Screen name="pending" component={PendingOrdersScreen} />
      <Tab.Screen name="completed" component={CompleteOrdersScreen} />
      <Tab.Screen name="rejected" component={RejectedOrderScreen} />
    </Tab.Navigator>
  );
}
