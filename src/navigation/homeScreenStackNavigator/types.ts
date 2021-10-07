import {RouteProp, NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigatorParamList} from '../bottomTabNavigator/types';
import {CombinedNavigationProp} from '../types';

export type HomeScreenStackParamList = {
  TabNav: NavigatorScreenParams<BottomTabNavigatorParamList>;
  Search: undefined;
  Restaurant: {
    isOpen: boolean;
    id: string;
    collection: string;
    name: string;
    address: string;
  };
  AddNewAddress: {
    id?: string;
    tag?: string;
    pincode?: string;
    home?: string;
    area?: string;
    landmark?: string;
    city?: string;
    state?: string;
    isEditMode: boolean;
    title: string;
  };
  Terms: undefined;
  AboutUs: undefined;
  Refund: undefined;
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

export type AddNewAddressScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<HomeScreenStackParamList, 'AddNewAddress'>;
};

export type TermsScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<HomeScreenStackParamList, 'Terms'>;
};
export type AboutUsScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<HomeScreenStackParamList, 'AboutUs'>;
};
