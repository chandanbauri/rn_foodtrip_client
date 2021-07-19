import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {CombinedNavigationProp} from '../types';
export type BottomTabNavigatorParamList = {
  Home: undefined;
  Cart: undefined;
  Account: undefined;
};

export type HomeScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<BottomTabNavigatorParamList, 'Home'>;
};

export type CartScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<BottomTabNavigatorParamList, 'Cart'>;
};

export type AccountScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<BottomTabNavigatorParamList, 'Account'>;
};
