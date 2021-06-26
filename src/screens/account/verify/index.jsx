import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../contexts/Auth';
const VerificationScreen = ({route}) => {
  const navigation = useNavigation();
  const {phoneNo} = route.params;
  const [code, setCode] = useState(null);
  const handleTextInput = text => setCode(() => text);
  const {resendVerificationCode, verifyPhone} = useContext(AuthContext);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Verify Phone Number</Text>
      <View style={styles.inputContainer}>
        <TextInput
          textAlign="center"
          placeholder="_ _ _ _ _ _"
          value={code}
          onChangeText={handleTextInput}
        />
      </View>
      <View style={styles.optionsContainer}>
        <Pressable
          onPress={() => {
            resendVerificationCode(phoneNo);
          }}>
          <Text style={{fontSize: 12}}>Resend</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.filledLoginButton}
        onPress={() => {
          verifyPhone(code);
        }}>
        <Text style={styles.filledLoginButtonText}>Verify</Text>
      </Pressable>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 24,
    fontFamily: 'OpenSans-SemiBold',
  },
  inputContainer: {
    height: 50,
    width: '100%',
    borderColor: '#21BF73',
    borderWidth: 1,
    marginTop: 40,
  },
  optionsContainer: {
    width: '100%',
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'flex-end',
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
});