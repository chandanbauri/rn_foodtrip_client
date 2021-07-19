import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../../screens/home/search';
import RestaurantScreen from '../../screens/restaurant';
import BottomNavigator from '../bottomTabNavigator';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../contexts/Auth';
import {HomeScreenStackParamList} from './types';
const Stack = createStackNavigator<HomeScreenStackParamList>();
const HomeScreenStack = () => {
  // const navigation = useNavigation();
  // const {setUser} = React.useContext(AuthContext);
  // const onAuthStateChnaged = user => {
  //   if (user !== null) {
  //     setUser(user);
  //     navigation.navigate('Home', {screen: 'HomeScreenStack'});
  //   }
  // };
  // React.useEffect(() => {
  //   const subscribe = auth().onAuthStateChanged(onAuthStateChnaged);
  //   return subscribe;
  // }, []);
  return (
    <Stack.Navigator>
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
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
