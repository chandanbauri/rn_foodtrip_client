import * as React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  FlatList,
  ActivityIndicator,
  SectionList,
  Linking,
  Image,
} from 'react-native';
import PhoneAuthForm from '../../components/forms/phoneAuth';
import {AuthContext} from '../../contexts/Auth';
import AddressCard from '../../components/cards/address';
import FilledButton from '../../components/buttons/filled';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import {colors, getTotalCost, getValue} from '../../utilities';
import {foodObj} from '../../contexts/resource';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import {cancelOrder} from '../../utilities/cloud/functions';
import Loader from '../../components/loader/loader';
import {AccountScreenProps} from '../../navigation/accountStackNavigator/account';
import FocusedStatusBar from '../../components/statusBar';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../../components/NoInternet';

// import auth from '@react-native-firebase/auth';

const usersCollection = firestore().collection('Users');
export default function Account({navigation, route}: AccountScreenProps) {
  let initDetails = {
    tag: '',
    name: '',
    email: '',
    pincode: '',
    home: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
    phoneNumber: '',
  };
  let isFocused = useIsFocused();
  const [addresses, setAddresses] = React.useState<Array<any>>([]);
  const Auth = React.useContext(AuthContext);
  const [data, setData] = React.useState<any>();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [refresh, setRefresh] = React.useState<number>(1);
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [details, setDetails] = React.useState(initDetails);
  const [netState, setNetState] = React.useState<any>(null);
  // variables
  const snapPoints = React.useMemo(() => ['1%', '40%'], []);

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
  const EditAddress = async (address: any) => {
    navigation.navigate('AddNewAddress', {
      isEditMode: true,
      id: address.id,
      tag: address.tag,
      pincode: address.pincode,
      home: address.home,
      area: address.area,
      landmark: address.landmark,
      city: address.city,
      state: address.state,
      title: 'Edit address',
    });
  };
  const DeleteAddress = async (id: string) => {
    try {
      setInitializing(true);
      // setRefresh(true);
      await usersCollection
        .doc(Auth?.user?.uid)
        .collection('addresses')
        .doc(id)
        .delete();
      Alert.alert('Address Deleted', '');
      setRefresh(prev => prev + 1);
    } catch (error) {
      throw error;
    }
  };
  const getUserDetails = async () => {
    setInitializing(true);
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

  React.useEffect(() => {
    if (Auth?.user && isFocused) {
      getUserDetails().catch(error => {
        throw error;
      });
    } else {
      setAddresses([]);
      setData([]);
    }
    return;
  }, [Auth?.user, refresh, isFocused]);
  React.useEffect(() => {
    if (isFocused) {
      getData()
        .then(value => {
          if (value != null) {
            setData(value);
          }
          setInitializing(false);
        })
        .catch(error => {
          setInitializing(false);
          throw error;
        });
    } else {
      setInitializing(true);
    }
    return;
  }, [isFocused, refresh]);
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

  let tags = [
    {
      label: 'Office',
      value: 'office',
    },
    {
      label: 'Home',
      value: 'home',
    },
    {
      label: 'Others',
      value: 'others',
    },
  ];

  const Header = () => (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          borderColor: colors.divider,
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: colors.logo_color,
            fontWeight: 'bold',
          }}>{`My profile`}</Text>
        <View style={styles.titleBox}>
          <View>
            <Text style={styles.userName}>
              {`Name : ${
                auth().currentUser?.displayName
                  ? auth().currentUser?.displayName
                  : 'User Name'
              }`}
            </Text>
            <Text style={styles.phoneNumber}>{`Phone : ${
              auth().currentUser?.phoneNumber
            }`}</Text>
            {auth().currentUser?.email && (
              <Text style={styles.phoneNumber}>{`Email : ${
                auth().currentUser?.email
              }`}</Text>
            )}
          </View>
          <View>
            <Pressable
              onPress={() => navigation.navigate('EditProfile')}
              style={{
                marginTop: 20,
                width: '100%',
                maxWidth: 100,
                paddingVertical: 2,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: colors.divider,
                borderWidth: 1,
              }}>
              <Text style={{fontSize: 12}}>Edit</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Text style={styles.ListHeaderTitle}>Addresses</Text>
    </>
  );
  if (initializing) return <Loader />;
  if (!netState) return <NoInternet />;
  if (Auth?.user !== null)
    return (
      <>
        <FocusedStatusBar
          backgroundColor="#D17755"
          barStyle="light-content"
          translucent={true}
        />
        <View style={styles.root}>
          <View style={styles.subContainer}>
            <FlatList
              ListHeaderComponent={<Header />}
              data={addresses}
              // sections={[
              //   {
              //     title: 'Addresses',
              //     data: addresses,
              //   },
              // ]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({item, index}) => (
                <AddressCard
                  {...item}
                  onEdit={() => {
                    EditAddress(item);
                  }}
                  isInProfile={true}
                  isDefault={true}
                  onDelete={() => DeleteAddress(item.id)}
                />
              )}
              // stickySectionHeadersEnabled={true}
              // renderSectionHeader={({section: {title}}) => (
              //   <Text style={[styles.sectionTitle, {backgroundColor: '#fff'}]}>
              //     {title}
              //   </Text>
              // )}
              ListEmptyComponent={
                <View>
                  <Text style={{fontStyle: 'italic'}}>
                    *You do not have any saved address
                  </Text>
                </View>
              }
              ListFooterComponent={
                <>
                  <FilledButton
                    text="Add New"
                    onPress={() => {
                      navigation.navigate('AddNewAddress', {
                        isEditMode: false,
                        title: 'Add New Address',
                      });
                    }}
                  />
                  <View style={styles.footerComponent}>
                    <View style={{marginTop: 10}}>
                      <Pressable
                        style={{marginVertical: 5}}
                        onPress={() => {
                          navigation.navigate('Main', {
                            screen: 'Terms',
                          });
                        }}>
                        <Text
                          style={{
                            color: colors.time_and_address,
                            fontSize: 14,
                          }}>
                          Terms & Conditions
                        </Text>
                      </Pressable>
                      <Pressable
                        style={{marginVertical: 5}}
                        onPress={() => {
                          navigation.navigate('Main', {
                            screen: 'Refund',
                          });
                        }}>
                        <Text
                          style={{
                            color: colors.time_and_address,
                            fontSize: 14,
                          }}>
                          Refund Policy
                        </Text>
                      </Pressable>
                      <Pressable
                        style={{marginVertical: 5}}
                        onPress={() => {
                          navigation.navigate('Main', {
                            screen: 'AboutUs',
                          });
                        }}>
                        <Text
                          style={{
                            color: colors.time_and_address,
                            fontSize: 14,
                          }}>
                          About Company
                        </Text>
                      </Pressable>
                    </View>
                    <Pressable
                      style={{
                        paddingVertical: 15,
                        backgroundColor: colors.gray,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginTop: 10,
                      }}
                      onPress={() => {
                        Alert.alert('Are you sure ?', 'You want to logout', [
                          {
                            text: 'cancel',
                          },
                          {
                            text: 'Sure',
                            onPress: () => {
                              Auth?.signOut();
                            },
                          },
                        ]);
                      }}>
                      <Text style={{color: colors.white, fontSize: 16}}>
                        Log out
                      </Text>
                    </Pressable>
                    {/* <View
                      style={{
                        marginTop: 80,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => {
                          Linking.openURL('https://webchal.in');
                        }}>
                        <Text
                          style={{
                            color: colors.logo_color,
                            marginRight: 4,
                            fontSize: 12,
                          }}>
                          Developed By{' '}
                        </Text>
                        <View style={{width: 90}}>
                          <Image
                            source={require('../../assets/webchal_logo.png')}
                            style={{
                              height: 25,
                              width: '100%',
                            }}
                          />
                        </View>
                      </Pressable>
                    </View> */}
                  </View>
                </>
              }
            />
          </View>
        </View>
      </>
    );
  return <PhoneAuthForm />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
    position: 'relative',
    backgroundColor: colors.white,
  },
  subContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  titleBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
  },
  phoneNumber: {
    fontSize: 12,
    color: colors.time_and_address,
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
    flex: 1,
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
  footerComponent: {
    width: '100%',
    paddingBottom: 100,
  },
  ListHeaderTitle: {
    color: colors.logo_color,
    fontWeight: '700',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
});
