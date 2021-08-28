import * as React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../utilities';

type props = {
  tag: string;
  // onPress: () => void;
  pincode: '';
  home: '';
  area: '';
  landmark: '';
  city: '';
  state: '';
};

const AddressCard = ({
  tag,
  pincode,
  home,
  area,
  landmark,
  city,
  state,
}: props) => {
  // console.log(tag, pincode, home, area, landmark, city, state);
  return (
    <Pressable>
      <View style={styles.root}>
        <Text style={styles.title}>{tag}</Text>
        <Text
          style={
            styles.address
          }>{`${home}, ${area}, ${landmark}, ${city}, ${state},${pincode}`}</Text>
      </View>
    </Pressable>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: `${colors.brown}20`,
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
