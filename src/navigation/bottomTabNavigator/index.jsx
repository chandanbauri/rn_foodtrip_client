import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Cart from '../../screens/cart';
import Account from '../../screens/account';
import HomeScreenStack from '../homeScreenStackNavigator';
import { Text } from 'react-native'
import { ResourceContext } from '../../contexts/resource';
import Home from '../../screens/home';
const BottomTab = createBottomTabNavigator();
const BottomNavigator = () => {
    const { cart } = useContext(ResourceContext)
    return (
      <BottomTab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: TabBarIcon(route),
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#000000',
          tabBarLabelStyle: {fontSize: 12},
          //tabBarShowLabel: false,
          tabBarLabel: TabBarLabel(route),
        })}>
        <BottomTab.Screen
          name="HomeScreenStack"
          component={Home}
          options={{
            headerTitle: `Food Trip`,
            headerTitleStyle: {
              color: '#21BF73',
              fontFamily: 'OpenSans-SemiBold',
            },
          }}
        />
        <BottomTab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
            tabBarBadge: cart.length > 0 ? cart.length : null,
          }}
        />
        <BottomTab.Screen
          name="Account"
          component={Account}
          options={{headerShown: false}}
        />
      </BottomTab.Navigator>
    );
}

export default BottomNavigator

const TabBarIcon = (route) => (({ focused, size }) => {
    let iconName;
    switch (route.name) {
        case "HomeScreenStack":
            iconName = focused ? 'home' : 'home-outline'
            break
        case "Cart":
            iconName = focused ? 'shopping' : 'shopping-outline'
            break

        case "Account":
            iconName = focused ? 'person' : 'person-outline'
            return <Ionicons name={iconName} size={size} color="#000" />

    }
    return <MaterialCommunityIcons name={iconName} size={size} color="#000" />
});

const TabBarLabel = (route) => (() => {
    let labelName
    switch (route.name) {
        case "HomeScreenStack":
            labelName = "Home"
            break
        case "Cart":
            labelName = "Cart";
            break
        case "Account":
            labelName = "Account"
            break
    }
    return <Text style={{ fontSize: 13, fontFamily: 'OpenSans' }}>{`${labelName}`}</Text>
})