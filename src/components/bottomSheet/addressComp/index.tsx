import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AddressCard from '../../cards/address';
import FilledButton from '../../buttons/filled';
import {colors} from '../../../utilities';

const BSAddressComp = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Choose your location</Text>
      <Pressable onPress={() => {}}>
        <View style={styles.containerForCLOption}>
          <Feather name="map-pin" color={colors.brown} size={28} />
          <View style={styles.ClTextContainer}>
            <Text style={[styles.CLtext, styles.CLTitle]}>
              Use your current location
            </Text>
            <Text style={[styles.CLtext, styles.CLaddressText]}>
              Road 5, Dishergarh Asansol Barddhaman
            </Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.subContainer}>
        <Text style={styles.sectionTitle}>Saved Address</Text>
        <AddressCard />
        <AddressCard />
        <AddressCard />
        <FilledButton text="New Address" onPress={() => {}} />
      </View>
    </View>
  );
};

export default BSAddressComp;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    color: '#AAAAAA',
    fontSize: 18,
  },
  //  Styles for use your location Option
  containerForCLOption: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ClTextContainer: {
    marginLeft: 10,
  },
  CLtext: {
    color: colors.brown,
  },
  CLTitle: {
    fontSize: 16,
  },
  CLaddressText: {
    fontSize: 13,
  },
  subContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#44444475',
    marginBottom: 10,
  },
});
