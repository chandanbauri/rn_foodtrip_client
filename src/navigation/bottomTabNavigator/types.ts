import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {CombinedNavigationProp} from '../types';
export type BottomTabNavigatorParamList = {
  Home: undefined;
  BookOrder: undefined;
  Account: undefined;
};

export type HomeScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<BottomTabNavigatorParamList, 'Home'>;
};



