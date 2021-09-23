import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Dimensions} from 'react-native';
import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../contexts/Auth';
import {CombinedNavigationProp} from '../../../navigation/types';
import {colors, validatePhoneNo} from '../../../utilities';
import FocusedStatusBar from '../../statusBar';

const {width, height} = Dimensions.get('window');

const PhoneAuthForm: React.FunctionComponent = () => {
  const navigation = useNavigation<CombinedNavigationProp>();
  const [phoneNo, setPhoneNo] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const handleTextInput = (text: string) => {
    setPhoneNo(prev => {
      if (text.length === 10 || text.length === 0) {
        setError(false);
      } else setError(true);
      return text;
    });
  };
  const Auth = React.useContext(AuthContext);

  const handleSubmit = async () => {
    if (validatePhoneNo(phoneNo)) {
      Auth?.phoneAuth(`+91${phoneNo}`);
      navigation.navigate('Verify', {phone: `+91${phoneNo}`});
    } else {
      setError(true);
    }
  };
  //+-555-521-5554
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#FFF"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={styles.root}>
        <View
          style={{
            // height: height * 0.5,
            // width: '100%',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: colors.white,
          }}>
          <Ionicons name="fast-food" size={60} color={colors.brown} />
          <View
            style={{
              padding: 10,
              borderLeftColor: colors.brown,
              borderLeftWidth: 2,
              flexDirection: 'column',
              marginLeft: 10,
            }}>
            <Text
              style={{
                color: colors.brown,
                fontWeight: 'bold',
                fontFamily: 'Opensans',
                fontSize: 20,
              }}>
              Count Memories
            </Text>
            <Text
              style={{
                color: colors.brown,
                fontWeight: 'bold',
                fontFamily: 'Opensans',
                fontSize: 14,
              }}>
              Not Calories
            </Text>
          </View>
        </View>
        <View style={styles.guestUserContainer}>
          <Text style={styles.guestUserTitle}>{`FOOD DELIVERY ACCOUNT`}</Text>
          <Text
            style={
              styles.guestUserSubtitle
            }>{`To have delicious food quickly login/create an account`}</Text>
          <View style={styles.inputContainer}>
            <Text style={{color: colors.brown}}>{'+ 91'}</Text>
            <TextInput
              style={{
                marginLeft: 10,
                color: error ? colors.error : colors.brown,
                width: '100%',
              }}
              keyboardType="number-pad"
              value={phoneNo}
              onChangeText={handleTextInput}
            />
          </View>
          {error == true && (
            <Text style={{color: colors.error, marginTop: 2, fontSize: 12}}>
              The phone number is invalid
            </Text>
          )}
          <Pressable style={styles.filledLoginButton} onPress={handleSubmit}>
            <Text style={styles.filledLoginButtonText}>Login</Text>
          </Pressable>
          <Pressable
            style={{marginVertical: 5}}
            onPress={() => {
              navigation.navigate('Main', {
                screen: 'Terms',
              });
            }}>
            <Text style={{color: '#AAA', fontSize: 14}}>
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
            <Text style={{color: '#AAA', fontSize: 14}}>Refund Policy</Text>
          </Pressable>
          <Pressable
            style={{marginVertical: 5}}
            onPress={() => {
              navigation.navigate('Main', {
                screen: 'AboutUs',
              });
            }}>
            <Text style={{color: '#AAA', fontSize: 14}}>About Company</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default PhoneAuthForm;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },
  guestUserContainer: {
    height: 315,
    backgroundColor: '#FFFFFF',
    width: width,
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
    backgroundColor: colors.brown,
    alignItems: 'center',
    marginBottom: 50,
  },
  filledLoginButtonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
  },
  inputContainer: {
    height: 50,
    borderBottomColor: colors.brown,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
