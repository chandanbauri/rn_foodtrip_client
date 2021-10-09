import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ResourceContext, ResourceProvider} from '../../contexts/resource';
import HomeScreenStack from '../homeScreenStackNavigator';
import {AuthContextProvider} from '../../contexts/Auth';
import VerificationScreen from '../../screens/account/verify';
import {LocationProvider} from '../../contexts/location';
import {AuthNavigatorParamList} from './types';
import GreetScreen from '../../screens/greet';
import {getValue, setValue} from '../../utilities';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
const Stack = createStackNavigator<AuthNavigatorParamList>();
const AuthNavigator = () => {
  const [isFirstVisit, setFirstVisit] = React.useState<boolean>(false);
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const load = async () => {
    let value = await getValue('firstVisit');
    if (!value) {
      await setValue('not First', 'firstVisit');
      setFirstVisit(prev => true);
      setInitializing(prev => false);
    } else {
      setFirstVisit(prev => false);
      setInitializing(prev => false);
    }
  };
  React.useEffect(() => {
    load();
  });
  React.useEffect(() => {
    // Listining for Foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const message = remoteMessage;
      if (message.notification?.title)
        Alert.alert(message.notification?.title, message.notification?.body);
    });

    return unsubscribe;
  });
  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      // //console.log(
      //   'Notification caused app to open from background state:',
      //   remoteMessage.notification,
      // );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // //console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage.notification,
          // );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }, []);

  if (initializing) return null;
  return (
    <AuthContextProvider>
      <ResourceProvider>
        <LocationProvider>
          <Stack.Navigator
            initialRouteName={isFirstVisit ? 'Greet' : 'Main'}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={HomeScreenStack} />
            <Stack.Screen name="Verify" component={VerificationScreen} />

            <Stack.Screen name="Greet" component={GreetScreen} />
          </Stack.Navigator>
        </LocationProvider>
      </ResourceProvider>
    </AuthContextProvider>
  );
};

export default AuthNavigator;
