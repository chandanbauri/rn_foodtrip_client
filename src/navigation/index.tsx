import * as React from 'react';
import {Alert, BackHandler, Text, ToastAndroid, View} from 'react-native';
import AuthNavigator from './authNavigator';
import firebase from '@react-native-firebase/app';
function Root() {
  const credentials = {
    apiKey: 'AIzaSyBMmVYbIT0li0iIFAQyqesI0XgxBplY7K4',
    authDomain: 'foodadda3-3aeca.firebaseapp.com',
    projectId: 'foodadda3-3aeca',
    storageBucket: 'foodadda3-3aeca.appspot.com',
    messagingSenderId: '348529372287',
    appId: '1:1093723294271:android:6b620dacb9a802ea26868a',
    measurementId: 'G-3X6SXH6GT7',
    databaseURL: 'https://foodadda3-3aeca-default-rtdb.firebaseio.com/',
  };

  const config = {
    name: 'SECONDARY_APP',
  };
  const intializeSecondaryApp = async () => {
    let isIinitialized = firebase.apps.findIndex(
      item => item.name == config.name,
    );
    if (isIinitialized == -1) {
      firebase.initializeApp(credentials, config);
    }
  };

  const exitApp = React.useRef<number>(0);
  const backAction = () => {
    setTimeout(() => {
      exitApp.current = 0;
    }, 2000); // 2 seconds to tap second-time

    if (exitApp.current === 0) {
      exitApp.current = 1;
      ToastAndroid.show(
        'Double Click on the back button to exit',
        ToastAndroid.SHORT,
      );
      return true;
    }
    if (exitApp.current === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  intializeSecondaryApp();
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return <AuthNavigator />;
}

export default Root;
