import functions from '@react-native-firebase/functions';

// Cloud Function Instances
export let getRestaurantList = functions().httpsCallable('getRestaurantList');
export let getMenuList = functions().httpsCallable('getMenuList');
export let createOrder = functions().httpsCallable('createOrder');
export let cancelOrder = functions().httpsCallable('cancelOrder');
export let generateOrderID = functions().httpsCallable('generateOrderID');
