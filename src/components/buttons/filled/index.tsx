import * as React from 'react';
import {StyleSheet, Pressable, View, Text} from 'react-native';
import {colors} from '../../../utilities';

type props = {
  text: string;
  onPress: () => void;
  fontSize?: number;
};

const FilledButton = ({text, onPress}: props) => {
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
    backgroundColor: colors.green,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    color: '#FFFFFF',
  },
});
