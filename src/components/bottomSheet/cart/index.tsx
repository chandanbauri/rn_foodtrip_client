import * as React from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
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
import {getFeatures} from '../../../utilities/cloud/functions';
import Loader from '../../loader/loader';
import RNPickerSelect from 'react-native-picker-select';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../../NoInternet';
import firebase from '@react-native-firebase/app';
function CartInfo() {
  const isFocused = useIsFocused();
  const usersCollection = firestore().collection('Users');
  const [orderAddress, setOrderAddress] = React.useState('');
  const [alternatePhone, setAlternatePhone] = React.useState<string | null>(
    null,
  );
  const pickerRef = React.createRef<Picker<string>>();
  const Resource = React.useContext(ResourceContext);
  const Auth = React.useContext(AuthContext);
  const [features, setFeatures] = React.useState<any>();
  const [totalCost, setTotalCost] = React.useState<number>(0);
  const [addresses, setAddresses] = React.useState<Array<any>>([]);
  const [netState, setNetState] = React.useState<any>(null);
  const [initializing, setInitializing] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getFeatures = firebase
      .app('SECONDARY_APP')
      .firestore()
      .collection('Features')
      .doc('production')
      .onSnapshot(snap => {
        setFeatures(snap.data());
      });
    return () => getFeatures();
  }, []);
  React.useEffect(() => {
    if (Auth && Auth.user) {
      const fetchUserAddress = firebase
        .app()
        .firestore()
        .collection('Users')
        .doc(Auth?.user.uid)
        .collection('addresses')
        .onSnapshot(snap => {
          let address: Array<any> = [];
          // console.log('SNAP SIZE', snap.size);
          if (snap.size === 0) {
            setAddresses([]);
            return;
          }
          snap.forEach(addess => {
            if (orderAddress == '') {
              setOrderAddress(
                `${addess.data().home}, ${addess.data().area}, ${
                  addess.data().landmark
                }, ${addess.data().city}, ${addess.data().state},${
                  addess.data().pincode
                }`,
              );
            }
            address.push({...addess.data(), id: addess.id});
          });
          setAddresses(address);
        });
      return () => fetchUserAddress();
    }
    setAddresses([]);
  }, [Auth, Auth?.user]);
  function open() {
    if (pickerRef && pickerRef.current) pickerRef.current.focus();
  }

  function close() {
    if (pickerRef && pickerRef.current) pickerRef.current.blur();
  }
  React.useEffect(() => {
    if (Resource && Resource?.cart.length) {
      let total = 0;
      Resource.cart.map((item: any) => {
        if (item.count) total = total + item.cost * item.count;
      });
      setTotalCost(total);
    }
    return;
  }, [Resource?.cart]);
  // React.useEffect(() => {
  //   if (isFocused)
  //     fetchFeatures().catch(error => {
  //       throw error;
  //     });
  //   return;
  // }, [isFocused]);
  React.useEffect(() => {
    const unsubscribe = () => {
      setInitializing(true);
      NetInfo.addEventListener(state => {
        //console.log('Connection type', state.type);
        //console.log('Is connected?', state.isConnected);
        // networkState.current = state.isInternetReachable;
        setNetState(state.isConnected);
        setInitializing(!state.isConnected);
      });
    };
    return unsubscribe();
  }, []);
  const navigation = useNavigation<CombinedNavigationProp>();
  if (initializing) return <Loader />;
  if (!netState) return <NoInternet />;
  return (
    <View style={styles.root}>
      <View style={{marginTop: 20}}>
        <Text style={[styles.text, {fontSize: 14}]}>Delivery address</Text>
        {addresses.length ? (
          <View style={{height: 50, width: '100%', position: 'relative'}}>
            <Picker
              selectedValue={orderAddress}
              onValueChange={(itemValue, itemIndex) => {
                setOrderAddress(prev => itemValue);
              }}
              ref={pickerRef}
              style={{
                flex: 1,
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
            <Pressable
              onPress={() => {
                open();
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // backgroundColor: colors.black,
              }}></Pressable>
          </View>
        ) : (
          <View style={{marginVertical: 20}}>
            <Text style={{fontStyle: 'italic'}}>
              *You do not have any saved address
            </Text>
          </View>
        )}
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
            style={{color: colors.brown}}
            keyboardType="number-pad"
            onChangeText={text => {
              setAlternatePhone(text);
            }}
          />
        </View>
      </View>
      {features && (
        <>
          <View style={styles.costSection}>
            <Text style={styles.text}>GST</Text>
            <Text style={styles.text}>{`₹ ${
              (parseInt(features.gst) * totalCost) / 100
            }`}</Text>
          </View>
          <View style={styles.costSection}>
            <Text style={styles.text}>Delivery Charge</Text>
            <Text style={styles.text}>{`₹ ${features.delivery_charge}`}</Text>
          </View>
          <View style={styles.costSection}>
            <Text style={styles.text}>Total cost</Text>
            <Text style={styles.text}>{`₹ ${
              totalCost +
              parseInt(features.delivery_charge) +
              (parseInt(features.gst) * totalCost) / 100
            }`}</Text>
          </View>
        </>
      )}

      <FilledButton
        text="Proceed"
        onPress={() => {
          if (Auth?.user) {
            if (totalCost >= features.minimum_order_price)
              if (addresses && addresses.length)
                navigation.navigate('Proceed', {
                  grandTotal:
                    totalCost +
                    parseInt(features.delivery_charge) +
                    (parseInt(features.gst) * totalCost) / 100,
                  address: orderAddress,
                  gst: (parseInt(features.gst) * totalCost) / 100,
                  deliveryCharge: features.delivery_charge,
                  alternatePhone:
                    alternatePhone?.length == 10 ? alternatePhone : null,
                });
              else
                Alert.alert('Please provide a valid address', '', [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate('TabNav', {
                        screen: 'Account',
                      });
                    },
                  },
                ]);
            else
              Alert.alert(
                `The minimum order price is ₹ ${features.minimum_order_price} INR`,
                '',
                [
                  {
                    text: 'Ok',
                    onPress: () => {},
                  },
                ],
              );
          } else {
            Alert.alert('To place an Order you need to login first', '', [
              {
                text: 'OK',
                onPress: () => {
                  Resource?.EmptyCart();
                  Resource?.saveRestaurantDetils(null);
                  navigation.navigate('TabNav', {
                    screen: 'Account',
                  });
                },
              },
            ]);
          }
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
