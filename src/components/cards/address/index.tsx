import * as React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../utilities';

type props = {
  tag: string;
  // onPress: () => void;
  pincode: string;
  home: string;
  area: string;
  landmark: string;
  city: string;
  state: string;

  isInProfile?: boolean;
  isDefault?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

const AddressCard = ({
  tag,
  pincode,
  home,
  area,
  landmark,
  city,
  state,
  onEdit,
  onDelete,
}: props) => {
  return (
    <Pressable>
      <View style={styles.root}>
        <Text style={styles.title}>{tag}</Text>
        <Text
          style={
            styles.address
          }>{`${home}, ${area}, ${landmark}, ${city}, ${state},${pincode}`}</Text>
        <View style={styles.actionBar}>
          <Pressable
            style={styles.button}
            onPress={() => {
              if (onEdit) onEdit();
            }}>
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              if (onDelete) onDelete();
            }}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: `${colors.brown}90`,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  address: {
    fontSize: 12,
    color: colors.black,
    letterSpacing: 1.2,
    textTransform: 'capitalize',
  },
  defaultAddress: {
    borderColor: colors.green,
    borderWidth: 1,
  },
  actionBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.white,
    marginRight: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: colors.brown,
  },
});
