import React from 'react';
import {StyleSheet, Pressable, View, Text} from 'react-native';
import {colors} from '../../../utilities';

type props = {
  text: string;
  onPress: () => void;
  fontSize: number;
};

const BorderButton = ({text, onPress, fontSize}: props) => {
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
    borderColor: colors.brown,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    paddingVertical: 5,
  },
  text: {
    color: colors.brown,
    textTransform: 'uppercase',
  },
});
