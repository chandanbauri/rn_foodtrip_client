import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors} from '../../utilities';
import FocusedStatusBar from '../statusBar';

export default function Loader() {
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#FFF"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={styles.root}>
        <ActivityIndicator color={colors.brown} size={50} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
