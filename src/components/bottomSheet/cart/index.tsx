import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {foodObj, ResourceContext} from '../../../contexts/resource';
import {colors} from '../../../utilities';
import FilledButton from '../../buttons/filled';
import {CombinedNavigationProp} from '../../../navigation/types';
import {Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {ClipPath} from 'react-native-svg';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../contexts/Auth';
function CartInfo() {
  const usersCollection = firestore().collection('Users');
  const [orderAddress, setOrderAddress] = React.useState('');
  const [alternatePhone, setAlternatePhone] = React.useState<string | null>(
    null,
  );
  const Resource = React.useContext(ResourceContext);
  const Auth = React.useContext(AuthContext);
  const [totalCost, setTotalCost] = React.useState<number>(0);
  const getUserDetails = async () => {
    try {
      let list = await usersCollection
        .doc(Auth?.user?.uid)
        .collection('addresses')
        .get();
      if (list.size) {
        setAddresses(() => {
          return list.docs.map((item, index) => ({
            ...item.data(),
            id: item.id,
          }));
        });

        // );
      } else {
        setAddresses([]);
      }
    } catch (error) {
      throw error;
    }
  };
  const [addresses, setAddresses] = React.useState<Array<any>>([]);
  React.useEffect(() => {
    if (Resource?.cart.length) {
      let total = 0;
      Resource.cart.map((item: any) => {
        if (item.count) total = total + item.cost * item.count;
      });
      setTotalCost(total);
    }
    return;
  }, [Resource?.cart]);
  React.useEffect(() => {
    getUserDetails().catch(error => {
      throw error;
    });
    return;
  }, []);
  const navigation = useNavigation<CombinedNavigationProp>();
  return (
    <View style={styles.root}>
      <View style={{marginTop: 20}}>
        <Text style={[styles.text, {fontSize: 14}]}>Delivery address</Text>
        <Picker
          selectedValue={orderAddress}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue);
            setOrderAddress(prev => itemValue);
          }}
          style={{
            color: colors.brown,
          }}>
          {addresses.map((item, index) => (
            <Picker.Item
              key={index}
              label={item.tag}
              value={`${item.home}, ${item.area}, ${item.landmark}, ${item.city}, ${item.state},${item.pincode}`}
            />
          ))}
        </Picker>
      </View>
      <View
        style={{
          width: '100%',
          marginVertical: 10,
        }}>
        <View
          style={{
            width: '100%',
            borderBottomColor: colors.brown,
            borderBottomWidth: 2,
          }}>
          <TextInput
            placeholder="Alternate phone number (if any)"
            placeholderTextColor={colors.brown}
            keyboardType="number-pad"
            onChangeText={text => {
              setAlternatePhone(text);
            }}
          />
        </View>
      </View>
      <View style={styles.costSection}>
        <Text style={styles.text}>Total cost</Text>
        <Text style={styles.text}>{`₹ ${totalCost}`}</Text>
      </View>
      <FilledButton
        text="Proceed"
        onPress={() => {
          if (totalCost >= 150)
            navigation.navigate('Proceed', {
              grandTotal: totalCost,
              address: orderAddress,
              alternatePhone:
                alternatePhone?.length == 10 ? alternatePhone : null,
            });
          else
            Alert.alert('The minimum order price is ₹ 150 INR', '', [
              {
                text: 'Ok',
                onPress: () => {},
              },
            ]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 50,
    borderTopColor: `${colors.gray}65`,
    borderTopWidth: 2,
  },
  costSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text: {
    color: colors.brown,
    fontSize: 18,
  },
});

export default CartInfo;
