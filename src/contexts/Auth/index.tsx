import * as React from 'react';
import auth from '@react-native-firebase/auth';

type contextProps = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  phoneAuth: (phone: string) => void;
  verifyPhone: (code: string) => void;
  resendVerificationCode: (phone: string) => void;
};

const AuthContext = React.createContext<contextProps | null>(null);

const AuthContextProvider: React.FunctionComponent = ({children}) => {
  const [user, setUser] = React.useState<any>(null);
  const [confirmation, setConfirmation] = React.useState<any>(null);

  const phoneAuth = async (phone: string) => {
    try {
      let confirm = await auth().signInWithPhoneNumber(phone);
      setConfirmation(confirm);
    } catch (error) {
      throw error;
    }
  };
  const verifyPhone = async (code: string) => {
    if (code.length == 6) {
      try {
        await confirmation.confirm(code);
      } catch (error) {
        console.log(error);
        console.log('Invalid code.');
      }
    }
  };
  const resendVerificationCode = async (phone: string) => {
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
