import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Cart from '../../screens/cart';
import Account from '../../screens/account';
import {Text} from 'react-native';
import {ResourceContext} from '../../contexts/resource';
import Home from '../../screens/home';
import {BottomTabNavigatorParamList} from './types';
import {RouteProp} from '@react-navigation/core';
import {colors} from '../../utilities';

type TabBarIconProps = {
  focused: boolean;
  size: number;
};

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomNavigator = () => {
  const Resource = React.useContext(ResourceContext);
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: TabBarIcon(route),
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#000000',
        tabBarLabelStyle: {fontSize: 12},
        tabBarHideOnKeyboard: true,
        //tabBarShowLabel: false,
        tabBarLabel: TabBarLabel(route),
      })}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: `Food Adda`,
          headerTitleStyle: {
            color: colors.brown,
            fontFamily: 'OpenSans-SemiBold',
          },
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarBadge:
            Resource?.cart && Resource?.cart.length > 0
              ? Resource?.cart.length
              : undefined,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;

const TabBarIcon =
  (
    route: RouteProp<
      BottomTabNavigatorParamList,
      keyof BottomTabNavigatorParamList
    >,
  ) =>
  ({focused, size}: TabBarIconProps) => {
    let iconName;
    switch (route.name) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={size}
            color={focused ? colors.brown : `${colors.brown}90`}
          />
        );
      case 'Cart':
        iconName = focused ? 'shopping' : 'shopping-outline';
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={size}
            color={focused ? colors.brown : `${colors.brown}90`}
          />
        );

      case 'Account':
        iconName = focused ? 'person' : 'person-outline';
        return (
          <Ionicons
            name={iconName}
            size={size}
            color={focused ? colors.brown : `${colors.brown}90`}
          />
        );
    }
  };

const TabBarLabel =
  (
    route: RouteProp<
      BottomTabNavigatorParamList,
      keyof BottomTabNavigatorParamList
    >,
  ) =>
  ({focused}: any) => {
    let labelName;
    switch (route.name) {
      case 'Home':
        labelName = 'Home';
        break;
      case 'Cart':
        labelName = 'Cart';
        break;
      case 'Account':
        labelName = 'Account';
        break;
    }
    return (
      <Text
        style={{
          fontSize: 13,
          fontFamily: 'OpenSans',
          color: focused ? colors.brown : `${colors.brown}95`,
        }}>{`${labelName}`}</Text>
    );
  };
