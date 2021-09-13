import * as React from 'react';
import {
  Alert,
  Dimensions,
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

export default function AddNewAddress({
  navigation,
  route,
}: AddNewAddressScreenProps) {
  let {isEditMode, tag, state, area, home, city, landmark, pincode, id} =
    route.params;
  let initState = {
    tag: tag ?? 'office',
    pincode: pincode ?? '',
    home: home ?? '',
    area: area ?? '',
    landmark: landmark ?? '',
    city: city ?? '',
    state: state ?? '',
  };

  const [appState, setState] = React.useState(initState);
  const handleTextInput = (name: string) => (text: string) => {
    setState(prev => ({...prev, [name]: text}));
  };
  const usersCollection = firestore().collection('Users');
  const [initializing, setInitializing] = React.useState<boolean>(false);
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

  if (initializing) return <Loader />;
  return (
    <>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.title}>
            {isEditMode ? `Edit address` : `Add New Address`}
          </Text>
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
            <View
              style={{
                borderBottomColor: colors.brown,
                borderBottomWidth: 1,
              }}>
              <Picker
                selectedValue={appState.tag}
                onValueChange={(itemValue, itemIndex) => {
                  setState(prev => ({...prev, tag: itemValue}));
                }}
                style={{
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
                    'Please Fille the Required Fields',
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
                  // console.log(state);
                  setInitializing(true);
                }
              }}
            />
            <FilledButton
              text="Cancel"
              onPress={() => {
                navigation.navigate('Main', {
                  screen: 'TabNav',
                  params: {
                    screen: 'Home',
                  },
                });
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
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingBottom: 30,
    justifyContent: 'space-around',
    paddingTop: 14,
  },
  title: {
    fontSize: 24,
    color: colors.brown,
    marginVertical: 20,
  },
});
