import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
const AuthContext = createContext();
const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(undefined);
  const [confirmation, setConfirmation] = useState(null);
  const phoneAuth = async phone => {
    try {
      let confirm = await auth().signInWithPhoneNumber(phone);
      setConfirmation(confirm);
    } catch (error) {
      throw error;
    }
  };
  const verifyPhone = async (code = '') => {
    if (code.length == 6) {
      try {
        await confirmation.confirm(code);
      } catch (error) {
        console.log('Invalid code.');
      }
    }
  };
  const resendVerificationCode = async phone => {
    try {
      let confirm = await auth().signInWithPhoneNumber(phone, true);
      setConfirmation(confirm);
    } catch (error) {
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        phoneAuth,
        verifyPhone,
        resendVerificationCode,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContextProvider, AuthContext};
