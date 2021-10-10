import * as React from 'react';
import {Alert, BackHandler, Text, ToastAndroid, View} from 'react-native';
import AuthNavigator from './authNavigator';
function Root() {
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
