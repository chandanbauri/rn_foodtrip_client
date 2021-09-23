import * as React from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import FilledButton from '../../../components/buttons/filled';
import Loader from '../../../components/loader/loader';
import FocusedStatusBar from '../../../components/statusBar';
import {colors} from '../../../utilities';
import auth from '@react-native-firebase/auth';
import {EditProfileProps} from '../../../navigation/accountStackNavigator/account';
const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
    position: 'relative',
    backgroundColor: colors.white,
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
  },
});

export default function EditProfileScreen({
  navigation,
  route,
}: EditProfileProps) {
  let initDetails = {
    // tag: '',
    name: '',
    email: '',
    // pincode: '',
    // home: '',
    // area: '',
    // landmark: '',
    // city: '',
    // state: '',
    // phoneNumber: '',
  };
  const [details, setDetails] = React.useState(initDetails);
  const [initializing, setInitializing] = React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState<number>(1);
  const handleTextInput = (name: string) => (text: string) => {
    setDetails(prev => ({...prev, [name]: text}));
  };
  if (initializing) return <Loader />;
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#FFF"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={styles.root}>
        <View style={styles.bottomSheet}>
          {/* <Text style={styles.sectionTitle}>Edit your profile</Text> */}
          {/* <View
                style={{
                  borderBottomColor: colors.brown,
                  borderBottomWidth: 1,
                }}>
                <Picker
                  selectedValue={details.tag}
                  onValueChange={(itemValue, itemIndex) => {
                    setDetails(prev => ({...prev, tag: itemValue}));
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
              </View> */}
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
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 0,
              right: 0,
              paddingHorizontal: 14,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{width: '100%'}}>
              <FilledButton
                text="SAVE CHANGES"
                onPress={async () => {
                  setInitializing(true);
                  try {
                    if (details.name.length > 0)
                      auth().currentUser?.updateProfile({
                        displayName: details.name,
                      });
                    if (details.email.length > 0) {
                      auth().currentUser?.updateEmail(details.email);
                    }
                    // if (details.phoneNumber.length === 10) {
                    //   auth().currentUser?.updatePhoneNumber(
                    //     auth.PhoneAuthProvider.credential(
                    //       `+91${details.phoneNumber}`,
                    //     ),
                    //   );
                    // }
                    // await usersCollection
                    //   .doc(Auth?.user?.uid)
                    //   .collection('addresses')
                    //   .add({
                    //     tag: 'Home',
                    //     pincode: details.pincode,
                    //     home: details.home,
                    //     area: details.area,
                    //     landmark: details.landmark,
                    //     city: details.city,
                    //     state: details.state,
                    //   });
                    setRefresh(prev => prev + 1);
                    setInitializing(false);
                    Alert.alert(
                      'Profile Saved',
                      'Your Profile has been saved Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () => {
                            navigation.goBack();
                          },
                        },
                      ],
                    );
                    setDetails(initDetails);
                  } catch (error) {
                    throw error;
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
