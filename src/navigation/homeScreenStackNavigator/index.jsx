import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../../screens/home/search';
import RestaurantScreen from '../../screens/restaurant';
import BottomNavigator from '../bottomTabNavigator';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../contexts/Auth';
const Stack = createStackNavigator();
const HomeScreenStack = () => {
  const navigation = useNavigation();
  const {setUser} = useContext(AuthContext);
  const onAuthStateChnaged = user => {
    if (user !== null) {
      setUser(user);
      navigation.navigate('Home', {screen: 'HomeScreenStack'});
    }
  };
  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChnaged);
    return subscribe;
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerTitle: ''}}
      />
      <Stack.Screen name="ViewRestaurant" component={RestaurantScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
