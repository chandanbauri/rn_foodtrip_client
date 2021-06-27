import React, {useContext, useState, useCallback, useMemo, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PhoneAuthForm from '../../components/forms/phoneAuth';
import {AuthContext} from '../../contexts/Auth';
import AddressCard from '../../components/cards/address';
import FilledButton from '../../components/buttons/filled';
import BorderButton from '../../components/buttons/borderButton';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
const Account = () => {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const bottomSheetRef = useRef(null);
  const [isBottomSheetOpen, setBottomSheet] = useState(true);
  // variables
  const snapPoints = useMemo(() => ['0%', '60%'], []);

  // callbacks
  const handleSheetChanges = useCallback((fromIndex, toIndex) => {
    if (fromIndex == 1) bottomSheetRef.current?.close();
  }, []);
  const OpenBottomSheet = () => {
    console.log('hello');
    bottomSheetRef.current?.expand();
  };
  return (
    <ScrollView style={styles.root}>
      {user != null ? (
        <>
          <View style={styles.subContainer}>
            <View style={styles.titleBox}>
              <View>
                <Text style={styles.userName}>
                  {user.displayName ? user.displayName : 'User Name'}
                </Text>
                <Text style={styles.phoneNumber}>{user.phoneNumber}</Text>
              </View>
              {user.photoURL ? (
                <Image source={user.photoURL} />
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
      ) : (
        <PhoneAuthForm navigation={navigation} />
      )}
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
