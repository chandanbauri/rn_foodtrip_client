import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorParamList} from './authNavigator/types';
import {BottomTabNavigatorParamList} from './bottomTabNavigator/types';
import {HomeScreenStackParamList} from './homeScreenStackNavigator/types';
import {BookOrderParamList} from './BookOrder/types';

export type CombinedNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthNavigatorParamList, keyof AuthNavigatorParamList>,
  CompositeNavigationProp<
    CompositeNavigationProp<
      BottomTabNavigationProp<
        BottomTabNavigatorParamList,
        keyof BottomTabNavigatorParamList
      >,
      StackNavigationProp<BookOrderParamList, keyof BookOrderParamList>
    >,
    StackNavigationProp<
      HomeScreenStackParamList,
      keyof HomeScreenStackParamList
    >
  >
>;
