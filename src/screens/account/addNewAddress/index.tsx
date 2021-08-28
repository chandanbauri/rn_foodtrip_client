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

export default function AddNewAddress({
  navigation,
  route,
}: AddNewAddressScreenProps) {
  let initState = {
    tag: '',
    pincode: '',
    home: '',
    area: '',
    landmark: '',
    city: '',
    state: 'westbengal',
  };

  const [state, setState] = React.useState(initState);
  const handleTextInput = (name: string) => (text: string) => {
    setState(prev => ({...prev, [name]: text}));
  };
  const usersCollection = firestore().collection('Users');
  const [states, setStates] = React.useState<Array<any>>([]);
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
    fetchStatesDetails()
      .then(res => {
        setStates(res);
      })
      .catch(error => {
        throw error;
      });
  }, []);
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Add New Address</Text>
        <View>
          <TextInput
            placeholder="Tag"
            value={state.tag}
            placeholderTextColor={colors.brown}
            style={{
              borderBottomColor: colors.brown,
              borderBottomWidth: 1,
              color: colors.brown,
              marginVertical: 15,
            }}
            onChangeText={handleTextInput('tag')}
          />
          <TextInput
            placeholder="House no. , Flat, Building, Company, Apartment"
            placeholderTextColor={colors.brown}
            value={state.home}
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
            value={state.area}
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
            value={state.city}
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
            value={state.pincode}
            style={{
              borderBottomColor: colors.brown,
              borderBottomWidth: 1,
              color: colors.brown,
              marginVertical: 15,
            }}
            onChangeText={handleTextInput('pincode')}
            keyboardType="number-pad"
          />
          <View
            style={{
              borderBottomColor: colors.brown,
              borderBottomWidth: 1,
            }}>
            <Picker
              selectedValue={state.state}
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue);
                setState(prev => ({...prev, state: itemValue}));
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
              {/* <Picker.Item label="Jharkhand" value="jharkhand" /> */}
            </Picker>
          </View>
        </View>
        <View>
          <FilledButton
            text="save"
            onPress={async () => {
              //   console.log(state);
              if (
                state.area == '' ||
                state.city == '' ||
                state.home == '' ||
                state.landmark == '' ||
                state.pincode == '' ||
                state.state == '' ||
                '' ||
                state.tag == ''
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
                return;
              }
              try {
                let address = await usersCollection
                  .doc(auth().currentUser?.uid)
                  .collection('addresses')
                  .where('tag', '==', `${state.tag}`)
                  .get();
                if (address.size) {
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
                      tag: state.tag,
                      pincode: state.pincode,
                      home: state.home,
                      area: state.area,
                      landmark: state.landmark,
                      city: state.city,
                      state: state.state,
                    });
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
                throw error;
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
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingBottom: 30,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 24,
    color: colors.brown,
    marginVertical: 20,
  },
});
