import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {CombinedNavigationProp} from '../../../navigation/types';
import {colors} from '../../../utilities';

type props = {
  title: string;
};

const {width} = Dimensions.get('window');
const RestaurantHeader = ({title}: props) => {
  const navigation = useNavigation<CombinedNavigationProp>();
  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}>
        <Feather name="arrow-left" size={25} color="#21BF73" />
      </TouchableOpacity>
      <View style={styles.textContaier}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};
export default RestaurantHeader;
const styles = StyleSheet.create({
  root: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  text: {
    color: colors.green,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  backButton: {
    margin: 10,
  },
  textContaier: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -50,
  },
});
