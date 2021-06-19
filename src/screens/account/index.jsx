import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PhoneAuthForm from '../../components/forms/phoneAuth';
import {AuthContext} from '../../contexts/Auth';

const Account = () => {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  return (
    <View style={styles.root}>
      {user != null ? (
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
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  backgroundColor: '#BBB',
                }}></View>
            )}
          </View>
        </View>
      ) : (
        <PhoneAuthForm navigation={navigation} />
      )}
    </View>
  );
};
// The block for User and Giest
// {
//   user ? <GuestUser />
//     <UserProfile />
// }

export default Account;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#BBBBBB10',
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
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
});
