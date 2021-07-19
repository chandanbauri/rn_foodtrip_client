import {RouteProp, NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigatorParamList} from '../bottomTabNavigator/types';
import {CombinedNavigationProp} from '../types';

export type HomeScreenStackParamList = {
  TabNav: NavigatorScreenParams<BottomTabNavigatorParamList>;
  Search: undefined;
  Restaurant: undefined;
};

// export type TabNavProps = {
//   navigation: StackNavigationProp<HomeScreenStackParamList, 'TabNav'>;
//   route: RouteProp<HomeScreenStackParamList, 'TabNav'>;
// };
export type SearchScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<HomeScreenStackParamList, 'Search'>;
};

export type RestaurantScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<HomeScreenStackParamList, 'Restaurant'>;
};