import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors} from '../../utilities';
import FocusedStatusBar from '../statusBar';

export default function Loader() {
  return (
    <View style={styles.root}>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <ActivityIndicator color={colors.brown} size={50} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
