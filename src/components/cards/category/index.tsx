import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utilities';
type props = {
  name: string;
};

export const CategoryCard = ({name}: props) => {
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: 'https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800',
        }}
        style={{height: 70, width: 70, borderRadius: 35}}
      />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 14,
  },
  text: {
    color: colors.brown,
    fontWeight: '700',
    fontSize: 16,
    marginTop: 8,
  },
});
