import * as React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utilities';
import FocusedStatusBar from '../statusBar';
type props = {
  netState: boolean | null;
};
export default function Loader({netState}: props) {
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#D17755"
        barStyle="light-content"
        translucent={true}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {netState == null || netState == false ? (
          <Text>`There Is No Internet Connection`</Text>
        ) : (
          <ActivityIndicator color={colors.brown} size={50} />
        )}
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
