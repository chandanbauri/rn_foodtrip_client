import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthNavigatorParamList} from './authNavigator/types';
import {BottomTabNavigatorParamList} from './bottomTabNavigator/types';
import {HomeScreenStackParamList} from './homeScreenStackNavigator/types';
import {BookOrderParamList} from './BookOrder/types';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {AccountNavigatorParamlist} from './accountStackNavigator/account';
import {OrderScreenParamlist} from './orderNavigator/OrderNavigator';

// export type CombinedNavigationProp = CompositeNavigationProp<
//   StackNavigationProp<AuthNavigatorParamList, keyof AuthNavigatorParamList>,
//   CompositeNavigationProp<
//     CompositeNavigationProp<
//       CompositeNavigationProp<
//         BottomTabNavigationProp<
//           BottomTabNavigatorParamList,
//           keyof BottomTabNavigatorParamList
//         >,
//         CompositeNavigationProp<
//           StackNavigationProp<
//             AccountNavigatorParamlist,
//             keyof AccountNavigatorParamlist
//           >,
//           MaterialTopTabNavigationProp<
//             OrderScreenParamlist,
//             keyof OrderScreenParamlist
//           >
//         >
//       >,
//       StackNavigationProp<BookOrderParamList, keyof BookOrderParamList>
//     >,
//     StackNavigationProp<
//       HomeScreenStackParamList,
//       keyof HomeScreenStackParamList
//     >
//   >
// >;


export type CombinedNavigationProp =
  CompositeNavigationProp<
    StackNavigationProp<AuthNavigatorParamList, keyof AuthNavigatorParamList>,
    CompositeNavigationProp<
      StackNavigationProp<HomeScreenStackParamList, keyof HomeScreenStackParamList>,
      CompositeNavigationProp<
        BottomTabNavigationProp<BottomTabNavigatorParamList, keyof BottomTabNavigatorParamList>,
        CompositeNavigationProp<
          StackNavigationProp<BookOrderParamList, keyof BookOrderParamList>,
          CompositeNavigationProp<
            StackNavigationProp<AccountNavigatorParamlist, keyof AccountNavigatorParamlist>,
            MaterialTopTabNavigationProp<OrderScreenParamlist , keyof OrderScreenParamlist> > > > 
    >
  >