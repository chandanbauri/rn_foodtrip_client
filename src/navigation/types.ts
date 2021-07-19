import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorParamList} from './authNavigator/types';
import {BottomTabNavigatorParamList} from './bottomTabNavigator/types';
import {HomeScreenStackParamList} from './homeScreenStackNavigator/types';

export type CombinedNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthNavigatorParamList, keyof AuthNavigatorParamList>,
  CompositeNavigationProp<
    BottomTabNavigationProp<
      BottomTabNavigatorParamList,
      keyof BottomTabNavigatorParamList
    >,
    StackNavigationProp<
      HomeScreenStackParamList,
      keyof HomeScreenStackParamList
    >
  >
>;
