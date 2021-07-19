import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Dimensions} from 'react-native';
import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import {AuthContext} from '../../../contexts/Auth';
import {CombinedNavigationProp} from '../../../navigation/types';
import {validatePhoneNo} from '../../../utilities';

const {width} = Dimensions.get('window');

const PhoneAuthForm: React.FunctionComponent = () => {
  const navigation = useNavigation<CombinedNavigationProp>();
  const [phoneNo, setPhoneNo] = React.useState<string>('');
  const handleTextInput = (text: string) => setPhoneNo(() => text);
  const Auth = React.useContext(AuthContext);

  const handleSubmit = async () => {
    if (validatePhoneNo(phoneNo)) {
      Auth?.phoneAuth(`+91${phoneNo}`);
      navigation.navigate('Verify', {phone: phoneNo});
    }
  };
  //+-555-521-5554
  return (
    <View style={styles.root}>
      <View style={styles.guestUserContainer}>
        <Text style={styles.guestUserTitle}>{`FOOD DELIVERY ACCOUNT`}</Text>
        <Text
          style={
            styles.guestUserSubtitle
          }>{`To have delicious food quickly login/create an account`}</Text>
        <View style={styles.inputContainer}>
          <Text style={{color: '#21BF73'}}>{'+ 91'}</Text>
          <TextInput
            style={{marginLeft: 10, color: '#232323'}}
            keyboardType="number-pad"
            value={phoneNo}
            onChangeText={handleTextInput}
          />
        </View>
        <Pressable style={styles.filledLoginButton} onPress={handleSubmit}>
          <Text style={styles.filledLoginButtonText}>Login</Text>
        </Pressable>
        <Text style={styles.guestUserText}>{`Privacy Policy`}</Text>
        <Text style={styles.guestUserText}>{`Help`}</Text>
      </View>
    </View>
  );
};

export default PhoneAuthForm;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },
  guestUserContainer: {
    position: 'absolute',
    bottom: 0,
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
    backgroundColor: '#21BF73',
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
    borderBottomColor: '#21BF73',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
