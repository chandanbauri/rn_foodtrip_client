import {useIsFocused} from '@react-navigation/native';
import * as React from 'react';
import {Alert} from 'react-native';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import VerifyForm from '../../../components/forms/verify';
import Loader from '../../../components/loader/loader';
import FocusedStatusBar from '../../../components/statusBar';
import {AuthContext} from '../../../contexts/Auth';
import {VerifyScreenProps} from '../../../navigation/authNavigator/types';
import {colors} from '../../../utilities';
const VerificationScreen = ({navigation, route}: VerifyScreenProps) => {
  const {phone} = route.params;
  const [counter, setCounter] = React.useState<number>(30);
  const isFocused = useIsFocused();
  const [value, setValue] = React.useState('');
  const [Error, setError] = React.useState<string>('');
  const [initializing, setInitializing] = React.useState<boolean>(false);
  const decreaseCounter = () => {
    let timer = setInterval(() => {
      if (isFocused)
        setCounter(prev => {
          if (prev > 0) return prev - 1;
          else {
            clearInterval(timer);
            return 0;
          }
        });
    }, 1000);
    // return clearInterval(timer);
  };
  const Auth = React.useContext(AuthContext);
  const onVrify = async () => {
    setInitializing(true);
    await Auth?.verifyPhone(value)
      .then(() => {
        setInitializing(false);
        navigation.navigate('Main', {
          // On Verification navigate to the Profile page
          screen: 'TabNav',
          params: {
            screen: 'Account',
          },
        });
      })
      .catch(() => {
        setInitializing(false);
        Alert.alert(
          'Not a Valid Verification code !!',
          'Try to login once again',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Main', {
                  //if Failed navigate to the SignIn page
                  screen: 'TabNav',
                  params: {
                    screen: 'Account',
                  },
                });
              },
            },
          ],
        );
      });
  };
  React.useEffect(() => {
    if (isFocused) decreaseCounter();
    // decreaseCounter();
    return;
  }, []);

  if (initializing) return <Loader />;
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#FFF"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={styles.root}>
        <Text style={styles.titleText}>Verify Code</Text>
        <View style={{width: 200}}>
          <Text
            style={{
              color: colors.brown,
              textAlign: 'center',
            }}>{`A code has been sent to  ${phone}  via SMS`}</Text>
        </View>
        <View style={styles.inputContainer}>
          <VerifyForm value={value} setValue={setValue} />
          <Pressable
            onPress={() => {
              if (counter == 0) {
                setCounter(prev => 30);
                decreaseCounter();
                Auth?.resendVerificationCode(phone);
              }
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                textDecorationColor: colors.brown,
                color: colors.brown,
              }}>{`Resend code ${counter}`}</Text>
          </Pressable>
        </View>
        <View style={{width: '100%', paddingHorizontal: 15}}>
          <Pressable
            style={styles.nextButton}
            onPress={() => {
              onVrify();
              //navigation.navigate('tour_screen');
            }}>
            <Text
              style={{fontSize: 20, fontWeight: '700', color: colors.white}}>
              Verify
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  titleText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 80,
  },
  inputContainer: {
    alignItems: 'center',
  },
  nextButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: colors.brown,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 3,
  },
});

export default VerificationScreen;

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 14,
//   },
//   title: {
//     fontSize: 24,
//     fontFamily: 'OpenSans-SemiBold',
//   },
//   inputContainer: {
//     height: 50,
//     width: '100%',
//     borderColor: '#21BF73',
//     borderWidth: 1,
//     marginTop: 40,
//   },
//   optionsContainer: {
//     width: '100%',
//     marginTop: 5,
//     marginBottom: 10,
//     alignItems: 'flex-end',
//   },
//   filledLoginButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 35,
//     marginTop: 10,
//     backgroundColor: '#21BF73',
//     alignItems: 'center',
//     marginBottom: 50,
//   },
//   filledLoginButtonText: {
//     color: '#fff',
//     textTransform: 'uppercase',
//     fontSize: 14,
//     fontFamily: 'OpenSans-SemiBold',
//   },
// });
