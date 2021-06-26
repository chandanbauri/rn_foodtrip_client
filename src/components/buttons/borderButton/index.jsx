import React from 'react';
import {StyleSheet, Pressable, View, Text} from 'react-native';
const BorderButton = ({text, onPress, fontSize}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.root}>
        <Text style={[styles.text, {fontSize: fontSize}]}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default BorderButton;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    borderColor: '#21BF73',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    paddingVertical: 5,
  },
  text: {
    color: '#21BF73',
    textTransform: 'uppercase',
  },
});
