import AsyncStorage from '@react-native-async-storage/async-storage';

export const validatePhoneNo = (phone = '') => phone.length == 10;

export const colors = {
  green: '#21BF73',
  white: '#FFFFFF',
  gray: '#BBBBBB',
  logoBg: '#F0E4D7',
  brown: '#DE8971',
  black: '#0F0F0F',
  purple: '#6930C3',
  error: '#FF2442',
};

export const setValue = async (value: any, key: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw error;
  }
};

export const getValue = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
