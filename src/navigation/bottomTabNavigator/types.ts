import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {OrderScreenParamlist} from '../orderNavigator/OrderNavigator';
import {OrderStackParamlist} from '../orderStack/orderStack';
import {CombinedNavigationProp} from '../types';
export type BottomTabNavigatorParamList = {
  Home: undefined;
  BookOrder: undefined;
  Account: undefined;
  MyOrder: NavigatorScreenParams<OrderStackParamlist>;
};

export type HomeScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<BottomTabNavigatorParamList, 'Home'>;
};



