import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeScreenStackParamList} from '../homeScreenStackNavigator/types';
import {CombinedNavigationProp} from '../types';

export type AuthNavigatorParamList = {
  Main: NavigatorScreenParams<HomeScreenStackParamList>;
  Verify: {phone: string};
};

export type VerifyScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<AuthNavigatorParamList, 'Verify'>;
};
