import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ResourceProvider} from '../../contexts/resource';
import HomeScreenStack from '../homeScreenStackNavigator';
import {AuthContextProvider} from '../../contexts/Auth';
import VerificationScreen from '../../screens/account/verify';
import {LocationProvider} from '../../contexts/location';
import {AuthNavigatorParamList} from './types';
import GreetScreen from '../../screens/greet';
import {getValue, setValue} from '../../utilities';
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
            {isFirstVisit && (
              <Stack.Screen name="Greet" component={GreetScreen} />
            )}
          </Stack.Navigator>
        </LocationProvider>
      </ResourceProvider>
    </AuthContextProvider>
  );
};

export default AuthNavigator;
