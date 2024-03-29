import * as React from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FilledButton from '../../../components/buttons/filled';
import {colors} from '../../../utilities';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Picker} from '@react-native-picker/picker';
import {stat} from 'fs';
import {AddNewAddressScreenProps} from '../../../navigation/homeScreenStackNavigator/types';
import Loader from '../../../components/loader/loader';
import FocusedStatusBar from '../../../components/statusBar';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../../../components/NoInternet';

const {height, width} = Dimensions.get('window');
export default function AddNewAddress({
  navigation,
  route,
}: AddNewAddressScreenProps) {
  let {isEditMode, tag, state, area, home, city, landmark, pincode, id} =
    route.params;
  let initState = {
    name: auth().currentUser?.displayName
      ? auth().currentUser?.displayName
      : '',
    tag: tag ?? 'office',
    pincode: pincode ?? '',
    home: home ?? '',
    area: area ?? '',
    landmark: landmark ?? '',
    city: city ?? '',
    state: state ?? '',
  };
  const pickerRef = React.createRef<Picker<string>>();
  const [appState, setState] = React.useState(initState);
  const [netState, setNetState] = React.useState<any>(null);
  const handleTextInput = (name: string) => (text: string) => {
    setState(prev => ({...prev, [name]: text}));
  };
  const usersCollection = firestore().collection('Users');
  const [initializing, setInitializing] = React.useState<boolean>(false);
  function open() {
    if (pickerRef && pickerRef.current) pickerRef.current.focus();
  }

  function close() {
    if (pickerRef && pickerRef.current) pickerRef.current.blur();
  }
  // const [states, setStates] = React.useState<Array<any>>([]);
  // const fetchStatesDetails = async () => {
  //   // try {
  //   //   let states = await getDBdata({collection: 'resouce', fieldName: 'state'});
  //   // } catch (error) {
  //   //   throw error
  //   // }
  //   return [
  //     {
  //       label: 'West Bengal',
  //       value: 'westbengal',
  //     },
  //     {
  //       label: 'Jharkhand',
  //       value: 'jharkhand',
  //     },
  //   ];
  // };
  // React.useEffect(() => {
  //   fetchStatesDetails()
  //     .then(res => {
  //       setStates(res);
  //     })
  //     .catch(error => {
  //       throw error;
  //     });
  // }, []);
  const Save = async () => {
    try {
      await usersCollection
        .doc(auth().currentUser?.uid)
        .collection('addresses')
        .doc(id)
        .update({
          tag: appState.tag,
          pincode: appState.pincode,
          home: appState.home,
          area: appState.area,
          landmark: appState.landmark,
          city: appState.city,
          state: appState.state,
        });
      Alert.alert('Address updated successfully', '', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Account');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('The address does not exists', '', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Account');
          },
        },
      ]);
    }
  };
  const SaveNew = async () => {
    try {
      let address = await usersCollection
        .doc(auth().currentUser?.uid)
        .collection('addresses')
        .where('tag', '==', `${appState.tag}`)
        .get();
      if (address.size) {
        setInitializing(false);
        Alert.alert('Please Use A Different Tag Name ', '', [
          {
            text: 'Ok',
            onPress: () => {
              setState(initState);
            },
          },
        ]);
      } else {
        await usersCollection
          .doc(auth().currentUser?.uid)
          .collection('addresses')
          .add({
            tag: appState.tag,
            pincode: appState.pincode,
            home: appState.home,
            area: appState.area,
            landmark: appState.landmark,
            city: appState.city,
            state: appState.state,
          });
        setInitializing(false);
        Alert.alert('Address is Saved successfully', '', [
          {
            text: 'Ok',
            onPress: () => {
              setState(initState);
              navigation.navigate('Account');
            },
          },
        ]);
      }
    } catch (error) {
      setInitializing(false);
      throw error;
    }
  };
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
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, []);
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
  if (initializing) return <Loader />;
  if (!netState) return <NoInternet />;
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#D17755"
        barStyle="light-content"
        translucent={true}
      />
      <ScrollView>
        <View style={styles.root}>
          <View>
            {/* <TextInput
            placeholder="Tag"
            value={appState.tag}
            placeholderTextColor={colors.brown}
            style={{
              borderBottomColor: colors.brown,
              borderBottomWidth: 1,
              color: colors.brown,
              marginVertical: 15,
            }}
            onChangeText={handleTextInput('tag')}
          /> */}
            {!auth().currentUser?.displayName ? (
              <TextInput
                placeholder="Name"
                placeholderTextColor={colors.brown}
                value={appState.name ?? ''}
                style={{
                  borderBottomColor: colors.brown,
                  borderBottomWidth: 1,
                  color: colors.brown,
                  marginVertical: 15,
                }}
                onChangeText={handleTextInput('name')}
              />
            ) : null}
            <View
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                height: 50,
                width: '100%',
                position: 'relative',
              }}>
              <Picker
                selectedValue={appState.tag}
                onValueChange={(itemValue, itemIndex) => {
                  setState(prev => ({...prev, tag: itemValue}));
                }}
                ref={pickerRef}
                style={{
                  flex: 1,
                  color: colors.brown,
                }}>
                {tags.map((item, index: number) => (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={index}
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
                }}></Pressable>
            </View>
            <TextInput
              placeholder="House no. , Flat, Building, Company, Apartment"
              placeholderTextColor={colors.brown}
              value={appState.home}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
                marginVertical: 15,
              }}
              onChangeText={handleTextInput('home')}
            />
            <TextInput
              placeholder="Area, Street, Sector, Village"
              placeholderTextColor={colors.brown}
              value={appState.area}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
                marginVertical: 15,
              }}
              onChangeText={handleTextInput('area')}
            />
            <TextInput
              placeholder="Landmark"
              placeholderTextColor={colors.brown}
              value={appState.landmark}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
                marginVertical: 15,
              }}
              onChangeText={handleTextInput('landmark')}
            />
            <TextInput
              placeholder="Town/City"
              placeholderTextColor={colors.brown}
              value={appState.city}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
                marginVertical: 15,
              }}
              onChangeText={handleTextInput('city')}
            />
            <TextInput
              placeholder="Pincode"
              placeholderTextColor={colors.brown}
              value={appState.pincode}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
                marginVertical: 15,
              }}
              onChangeText={handleTextInput('pincode')}
              keyboardType="number-pad"
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={colors.brown}
              value={appState.state}
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
                color: colors.brown,
              }}
              onChangeText={handleTextInput('state')}
              keyboardType="default"
            />
          </View>
          <View>
            <FilledButton
              text="save"
              onPress={async () => {
                setInitializing(true);
                if (!auth().currentUser?.displayName) {
                  if (appState.name !== ' ' && appState.name !== '')
                    auth().currentUser?.updateProfile({
                      displayName: appState.name,
                    });
                  else {
                    Alert.alert('Name Cannot Be Empty', '', [
                      {
                        text: 'Ok',
                      },
                    ]);
                    return;
                  }
                }
                if (
                  appState.area == '' ||
                  appState.city == '' ||
                  appState.home == '' ||
                  appState.landmark == '' ||
                  appState.pincode == '' ||
                  appState.state == '' ||
                  appState.tag == ''
                ) {
                  Alert.alert(
                    'Please Fill the Required Fields',
                    'All the fields are required',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {},
                      },
                    ],
                  );
                } else {
                  if (isEditMode) {
                    await Save();
                  } else {
                    await SaveNew();
                  }
                  // //console.log(state);
                  setInitializing(false);
                }
              }}
            />
            <FilledButton
              text="Cancel"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    // height: height,
    // width: width,
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 14,
    paddingBottom: 30,
    justifyContent: 'flex-end',
    paddingTop: 14,
  },
  header: {
    height: height * 0.1,
    width: '100%',
    // position: 'absolute',
    justifyContent: 'center',
    paddingHorizontal: 14,
    top: 20,
  },
  title: {
    fontSize: 24,
    color: colors.brown,
    marginVertical: 20,
  },
});
