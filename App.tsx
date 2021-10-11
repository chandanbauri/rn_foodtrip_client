import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Root from './src/navigation';
import RNBootSplash from 'react-native-bootsplash';
import {enableScreens} from 'react-native-screens';

function App() {
  enableScreens();
  React.useEffect(() => {
    setTimeout(() => RNBootSplash.hide({fade: true}), 5000);
  });
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}

export default App;
