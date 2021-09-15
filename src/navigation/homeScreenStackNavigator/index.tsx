import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../../screens/home/search';
import RestaurantScreen from '../../screens/restaurant';
import BottomNavigator from '../bottomTabNavigator';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../contexts/Auth';
import {HomeScreenStackParamList} from './types';
import ViewRestaurant from '../../screens/viewRestaurant';
import {CombinedNavigationProp} from '../types';
import AddNewAddress from '../../screens/account/addNewAddress';
import {useResource} from '../../contexts/resource';
import TermsScreen from '../../screens/Terms';
import AboutUsScreen from '../../screens/about/about';
import {colors} from '../../utilities';
import {Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const Stack = createStackNavigator<HomeScreenStackParamList>();
const HomeScreenStack = () => {
  const navigation = useNavigation<CombinedNavigationProp>();
  const Auth = React.useContext(AuthContext);
  const Resource = useResource();
  const onAuthStateChnaged = (user: any) => {
    if (user !== null) {
      Auth?.setUser(user);
      // navigation.navigate('TabNav', {
      //   screen: 'Account',
      // });
    } else {
      Auth?.setUser(null);
      // navigation.navigate('Home');
    }
  };
  React.useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChnaged);
    return subscribe;
  }, []);
  let restore = async () => {
    try {
      if (Resource && Resource.fetchLastSavedCartInfo) {
        await Resource.fetchLastSavedCartInfo();
      }
    } catch (error) {
      throw error;
    }
  };
  React.useEffect(() => {
    restore();
  }, []);
  return (
    <Stack.Navigator initialRouteName="TabNav">
      <Stack.Screen
        name="TabNav"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="Restaurant"
        component={ViewRestaurant}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddNewAddress"
        component={AddNewAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: colors.brown,
            fontWeight: 'bold',
            fontStyle: 'italic',
          },
          headerTitle: 'TERMS & CONDITIONS',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Feather name="chevron-left" size={24} color={colors.brown} />
            </Pressable>
          ),
          headerLeftContainerStyle: {marginLeft: 10},
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: colors.brown,
            fontWeight: 'bold',
            fontStyle: 'italic',
          },
          headerTitle: 'ABOUT COMPANY',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Feather name="chevron-left" size={24} color={colors.brown} />
            </Pressable>
          ),
          headerLeftContainerStyle: {marginLeft: 10},
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
