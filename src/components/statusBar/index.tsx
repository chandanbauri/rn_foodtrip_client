import * as React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StatusBarProps, StatusBar} from 'react-native';

const FocusedStatusBar = (props: StatusBarProps) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusedStatusBar;
