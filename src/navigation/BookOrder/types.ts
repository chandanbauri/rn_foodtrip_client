import {RouteProp, NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CombinedNavigationProp} from '../types';

export type BookOrderParamList = {
  Cart: undefined;
  Proceed: {
    grandTotal: number;
    gst: number;
    deliveryCharge: number;
    alternatePhone?: string | null;
    address: string;
  };
};

export type CartScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<BookOrderParamList, 'Cart'>;
};

export type ProceedScreenProps = {
  navigation: CombinedNavigationProp;
  route: RouteProp<BookOrderParamList, 'Proceed'>;
};
