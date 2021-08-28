import * as React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import PhoneAuthForm from '../../components/forms/phoneAuth';
import {AuthContext} from '../../contexts/Auth';
import AddressCard from '../../components/cards/address';
import FilledButton from '../../components/buttons/filled';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {AccountScreenProps} from '../../navigation/bottomTabNavigator/types';
import {colors, getValue} from '../../utilities';
import {foodObj} from '../../contexts/resource';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
// import auth from '@react-native-firebase/auth';

const usersCollection = firestore().collection('Users');
export default function Account({navigation, route}: AccountScreenProps) {
  const [addresses, setAddresses] = React.useState<Array<any>>([]);
  const Auth = React.useContext(AuthContext);
  const [data, setData] = React.useState<any>();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [states, setStates] = React.useState<Array<any>>([]);
  const [initializing, setInitializing] = React.useState<boolean>(false);
  // variables
  const snapPoints = React.useMemo(() => ['1%', '80%'], []);

  const handleSheetChanges = React.useCallback((fromIndex, toIndex) => {
    if (fromIndex == 1) bottomSheetRef.current?.close();
  }, []);
  const handleTextInput = (name: string) => (text: string) => {
    setDetails(prev => ({...prev, [name]: text}));
  };
  const OpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };
  const getData = async () => {
    try {
      let myOrders = await usersCollection
        .doc(Auth?.user?.uid)
        .collection('orders')
        .get();
      if (myOrders.size) {
        setData(
          myOrders.docs.map((item, index) => ({...item.data(), id: item.id})),
        );
      } else {
        setData([]);
      }
    } catch (error) {
      setData([]);
      throw error;
    }
  };
  const getTotalCost = (list: Array<any> | any) => {
    let total = 0;
    list.map((item: any) => {
      if (item.count) total = total + item.cost * item.count;
    });

    return total;
  };

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
    } catch (error) {}
  };
  const fetchStatesDetails = async () => {
    // try {
    //   let states = await getDBdata({collection: 'resouce', fieldName: 'state'});
    // } catch (error) {
    //   throw error
    // }
    return [
      {
        label: 'West Bengal',
        value: 'westbengal',
      },
      {
        label: 'Jharkhand',
        value: 'jharkhand',
      },
    ];
  };
  React.useEffect(() => {
    if (Auth?.user) {
      getUserDetails().catch(error => {
        throw error;
      });
    } else {
      setAddresses([]);
      setData([]);
    }
    return;
  }, [Auth?.user]);
  React.useEffect(() => {
    getData()
      .then(value => {
        if (value != null) {
          setData(value);
        }
      })
      .catch(error => {
        throw error;
      });
    return;
  }, [Auth?.user]);
  React.useEffect(() => {
    fetchStatesDetails()
      .then(res => {
        setStates(res);
      })
      .catch(error => {
        throw error;
      });
    return;
  }, [Auth?.user]);
  let initDetails = {
    name: '',
    email: '',
    pincode: '',
    home: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
  };
  const [details, setDetails] = React.useState(initDetails);

  const Header = () => (
    <>
      <View style={styles.titleBox}>
        <View>
          <Text style={styles.userName}>
            {Auth?.user.displayName ? Auth?.user?.displayName : 'User Name'}
          </Text>
          <Text style={styles.phoneNumber}>{`${Auth?.user.phoneNumber}`}</Text>
          {Auth?.user?.email && (
            <Text style={styles.phoneNumber}>{`${Auth?.user?.email}`}</Text>
          )}
        </View>
        {/* <Pressable
          onPress={() => {
            OpenBottomSheet();
          }}>
          <Text style={{color: colors.brown, fontWeight: '700'}}>EDIT</Text>
        </Pressable> */}
      </View>
      <Text style={styles.sectionTitle}>Address</Text>
      <FlatList
        data={addresses}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => (
          <AddressCard {...item} isInProfile={true} isDefault={true} />
        )}
      />
      <FilledButton
        text="Add New"
        onPress={() => {
          navigation.navigate('AddNewAddress');
        }}
      />
      <Text style={[styles.sectionTitle, {marginTop: 20}]}>My Orders</Text>
    </>
  );

  if (Auth?.user !== null)
    return (
      <View style={styles.root}>
        <View style={styles.subContainer}>
          <FlatList
            data={data}
            ListHeaderComponent={() => <Header />}
            keyExtractor={(item, index: number) => {
              return `${index}`;
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  marginVertical: 5,
                  backgroundColor: colors.white,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.brown,
                  }}>{`Order Id: ${item.id}`}</Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.brown,
                    marginTop: 5,
                  }}>{`Cost : ${getTotalCost(item.items)}`}</Text>
                {item.isPending && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.brown,
                    }}>{`Order is Pending`}</Text>
                )}
                {item.isRejected && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.brown,
                    }}>{`Order was Rejected`}</Text>
                )}
                {item.isCanceled && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.brown,
                    }}>{`Order is Canceled`}</Text>
                )}
                {item.isOnGoing && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.brown,
                    }}>{`Order is On the way`}</Text>
                )}
                {item.isDelivered && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.brown,
                    }}>{`Order was Delivered`}</Text>
                )}
              </View>
            )}
            ListFooterComponent={
              <FilledButton
                text="Log out"
                onPress={() => {
                  Auth?.signOut();
                }}
              />
            }
          />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={Auth?.user.displayName ? -1 : 1}
          snapPoints={snapPoints}
          onAnimate={handleSheetChanges}
          keyboardBehavior="fullScreen"
          keyboardBlurBehavior="restore">
          <View style={styles.bottomSheet}>
            <Text style={styles.sectionTitle}>Edit your profile</Text>

            <TextInput
              placeholder="Name"
              placeholderTextColor={colors.brown}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
              }}
              onChangeText={handleTextInput('name')}
            />
            <TextInput
              placeholder="email"
              placeholderTextColor={colors.brown}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
              }}
              onChangeText={handleTextInput('email')}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="House no. , Flat, Building, Company, Apartment"
              placeholderTextColor={colors.brown}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
              }}
              onChangeText={handleTextInput('home')}
            />
            <TextInput
              placeholder="Area, Street, Sector, Village"
              placeholderTextColor={colors.brown}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
              }}
              onChangeText={handleTextInput('area')}
            />
            <TextInput
              placeholder="Landmark"
              placeholderTextColor={colors.brown}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
              }}
              onChangeText={handleTextInput('landmark')}
            />
            <TextInput
              placeholder="Town/City"
              placeholderTextColor={colors.brown}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
              }}
              onChangeText={handleTextInput('city')}
            />
            <TextInput
              placeholder="Pincode"
              placeholderTextColor={colors.brown}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
              }}
              onChangeText={handleTextInput('pincode')}
              keyboardType="number-pad"
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={colors.brown}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
              }}
              onChangeText={handleTextInput('state')}
              keyboardType="number-pad"
            />

            {/* <View
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
              }}>
              <Picker
                selectedValue={details.state}
                onValueChange={(itemValue, itemIndex) => {
                  setDetails(prev => ({...prev, state: itemValue}));
                }}
                style={{
                  color: colors.brown,
                }}>
                {states.map((item, index: number) => (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={index}
                  />
                ))}
              </Picker>
            </View> */}

            <FilledButton
              text="SAVE CHANGES"
              onPress={async () => {
                setInitializing(true);
                if (!Auth?.user?.displayName || !addresses.length) {
                  try {
                    await usersCollection
                      .doc(Auth?.user?.uid)
                      .collection('addresses')
                      .add({
                        tag: 'Home',
                        pincode: details.pincode,
                        home: details.home,
                        area: details.area,
                        landmark: details.landmark,
                        city: details.city,
                        state: details.state,
                      });
                    setInitializing(false);
                    Alert.alert(
                      'Profile Saved',
                      'Your Profile has been saved Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () => bottomSheetRef.current?.close(),
                        },
                      ],
                    );
                    setDetails(initDetails);
                  } catch (error) {
                    throw error;
                  }
                } else {
                  try {
                    let home = await usersCollection
                      .doc(Auth?.user?.uid)
                      .collection('addresses')
                      .where('tag', '==', 'Home')
                      .get();
                    await usersCollection
                      .doc(Auth?.user?.uid)
                      .collection('addresses')
                      .doc(home.docs[0].id)
                      .update({
                        tag: 'Home',
                        pincode: details.pincode,
                        home: details.home,
                        area: details.area,
                        landmark: details.landmark,
                        city: details.city,
                        state: details.state,
                      });
                    setInitializing(false);
                    Alert.alert(
                      'Profile Saved',
                      'Your Profile has been saved Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () => bottomSheetRef.current?.close(),
                        },
                      ],
                    );
                    setDetails(initDetails);
                  } catch (error) {
                    throw error;
                  }
                }
              }}
            />
          </View>
        </BottomSheet>
      </View>
    );
  return <PhoneAuthForm />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
  },
  subContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
  },
  phoneNumber: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  guestUserContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  guestUserTitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
  },
  guestUserSubtitle: {
    fontFamily: 'OpenSans',
    color: '#bbbbbb',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 5,
  },
  guestUserText: {
    fontFamily: 'OpenSans',
    color: '#bbbbbb',
    fontSize: 14,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  filledLoginButton: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    marginTop: 10,
    backgroundColor: colors.green,
    alignItems: 'center',
    marginBottom: 50,
  },
  filledLoginButtonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: 'OpenSans-SemiBold',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#44444475',
    marginBottom: 10,
  },

  bottomSheet: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  progressBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
