import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';
// Cloud Function Instances
export let getRestaurantList = functions().httpsCallable('getRestaurantList');
export let getMenuList = functions().httpsCallable('getMenuList');
export let createOrder = functions().httpsCallable('createOrder');
export let cancelOrder = functions().httpsCallable('cancelOrder');
export let generateOrderID = functions().httpsCallable('generateOrderID');
export let verifyPaymentRazorPay = functions().httpsCallable(
  'verifyPaymentRazorPay',
);
export let getDBdata = functions().httpsCallable('getDBdata'); // some parameters required
export let getFoodList = functions().httpsCallable('getFoodList');
export let generateFCMToken = messaging().getToken();
