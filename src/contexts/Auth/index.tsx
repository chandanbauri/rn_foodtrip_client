import * as React from 'react';
import auth from '@react-native-firebase/auth';


type contextProps = {
  user: any;
  guest: string | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  phoneAuth: (phone: string) => void;
  verifyPhone: (
    code: string,
    callBack: () => void,
    failure: () => void,
  ) => Promise<void>;
  resendVerificationCode: (phone: string | null) => void;
  signOut: () => void;
};

const AuthContext = React.createContext<contextProps | null>(null);

const AuthContextProvider: React.FunctionComponent = ({children}) => {
  const [user, setUser] = React.useState<any>(null);
  const [confirmation, setConfirmation] = React.useState<any>(null);
  const [guest, setGuest] = React.useState<string | null>(null);
  const phoneAuth = async (phone: string) => {
    try {
      let confirm = await auth().signInWithPhoneNumber(phone);
      setConfirmation(confirm);
      setGuest(prev => phone);
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
  const resendVerificationCode = async (phone: string | null) => {
    try {
      if (phone) {
        let confirm = await auth().signInWithPhoneNumber(phone, true);
        setConfirmation(confirm);
      }
    } catch (error) {
      throw error;
    }
  };
  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      throw e;
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
        signOut,
        guest,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContextProvider, AuthContext};
