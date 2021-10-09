import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
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
  logo_color: '#302b28',
  type_color: '#B6B6B8',
  time_and_address: '#65646A',
  order_online: '#48984b',
  closed: '#E81333',
  divider: '#D17755',
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

    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const getTotalCost = (list: Array<any> | any) => {
  let total = 0;
  list.map((item: any) => {
    if (item.count) total = total + item.cost * item.count;
  });

  return total;
};

export const isAvailable = (before: string, after: string) => {
  let format = 'HH:mm';
  let d = new Date();
  let hour = d.getHours();
  let minute = d.getMinutes();
  var time = moment([hour, minute], format),
    beforeTime = moment(before.split(':'), format),
    afterTime = moment(after.split(':'), format);
  if (time.isBetween(beforeTime, afterTime)) {
    // //console.log('TRUE');
    return true;
  } else {
    // //console.log('FALSE');
    return false;
  }
};
