import * as React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import PhoneAuthForm from '../../components/forms/phoneAuth';
import {AuthContext} from '../../contexts/Auth';
import AddressCard from '../../components/cards/address';
import FilledButton from '../../components/buttons/filled';
import BorderButton from '../../components/buttons/borderButton';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {AccountScreenProps} from '../../navigation/bottomTabNavigator/types';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const Account = ({navigation, route}: AccountScreenProps) => {
  const Auth = React.useContext(AuthContext);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  // variables
  const snapPoints = React.useMemo(() => ['1%', '60%'], []);

  // callbacks
  const handleSheetChanges = React.useCallback((fromIndex, toIndex) => {
    if (fromIndex == 1) bottomSheetRef.current?.close();
  }, []);
  const OpenBottomSheet = () => {
    console.log('hello');
    bottomSheetRef.current?.expand();
  };
  if (Auth?.user != null)
    return (
      <ScrollView style={styles.root}>
        <>
          <View style={styles.subContainer}>
            <View style={styles.titleBox}>
              <View>
                <Text style={styles.userName}>
                  {Auth?.user.displayName
                    ? Auth?.user.displayName
                    : 'User Name'}
                </Text>
                <Text style={styles.phoneNumber}>{Auth?.user.phoneNumber}</Text>
              </View>
              {Auth?.user.photoURL ? (
                <Image source={Auth?.user.photoURL} />
              ) : (
                <Pressable
                  onPress={() => {
                    OpenBottomSheet();
                  }}>
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      backgroundColor: '#BBB',
                    }}></View>
                </Pressable>
              )}
            </View>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.sectionTitle}>Saved Addresses</Text>
            <AddressCard />
            <AddressCard />
            <AddressCard />
            <FilledButton
              text="New Address"
              onPress={() => {
                console.log('hello');
              }}
            />
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.sectionTitle}>History</Text>
            <AddressCard />
            <AddressCard />
            <AddressCard />
            <FilledButton
              text="New Address"
              onPress={() => {
                console.log('hello');
              }}
            />
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onAnimate={handleSheetChanges}
            keyboardBehavior="fullScreen"
            keyboardBlurBehavior="restore"
            backdropComponent={props => <BottomSheetBackdrop {...props} />}>
            <View style={styles.bottomSheet}>
              <Text style={styles.sectionTitle}>Edit your profile</Text>
              <View>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    backgroundColor: '#BBB',
                  }}></View>
              </View>
              <View style={{width: '40%', marginBottom: 10}}>
                <BorderButton
                  text="upload image"
                  onPress={() => {}}
                  fontSize={12}
                />
              </View>
              <TextInput
                placeholder="Name"
                style={{borderBottomColor: '#AAA', borderBottomWidth: 1}}
              />
              <TextInput
                placeholder="Phone"
                style={{borderBottomColor: '#AAA', borderBottomWidth: 1}}
              />
              <FilledButton
                text="SAVE CHANGES"
                onPress={() => {
                  console.log('hello');
                }}
              />
            </View>
          </BottomSheet>
        </>
      </ScrollView>
    );
  return <PhoneAuthForm />;
};

export default Account;

const styles = StyleSheet.create({
  root: {
    height: height,
    width: width,
    position: 'relative',
    backgroundColor: '#BBBBBB10',
  },
  subContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
  },
  phoneNumber: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  guestUserContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFFFFF',
    width: '100%',
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
    fontSize: 20,
    fontFamily: 'OpenSans-SemiBold',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#44444475',
    marginBottom: 10,
  },

  bottomSheet: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
