import React from 'react';
import {StyleSheet, Pressable, View, Text} from 'react-native';
const FilledButton = ({text, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.root}>
        <Text style={[styles.text, {fontSize: 18}]}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default FilledButton;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: '#21BF73',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    color: '#FFFFFF',
  },
});
