import * as React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';

type props = {
  title: string;
  onPress: () => void;
  address: string;
};

const AddressCard = () => {
  return (
    <Pressable>
      <View style={styles.root}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.address}>Dishergarh Bazar para </Text>
      </View>
    </Pressable>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: '#21BF7350',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 14,
    color: '#171717',
    fontWeight: '700',
    marginBottom: 10,
  },
  address: {
    fontSize: 12,
    color: '#171717',
    letterSpacing: 1.2,
  },
});
