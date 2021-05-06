/**
 * @format
 */
import 'react-native-gesture-handler'
import {AppRegistry} from 'react-native';
import APP from './src/navigation';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => APP);
