import * as React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import PhoneAuthForm from '../../components/forms/phoneAuth';
import {AuthContext} from '../../contexts/Auth';
import AddressCard from '../../components/cards/address';
import FilledButton from '../../components/buttons/filled';
import BorderButton from '../../components/buttons/borderButton';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {AccountScreenProps} from '../../navigation/bottomTabNavigator/types';
import {Dimensions} from 'react-native';
import {colors, getValue} from '../../utilities';
import {FlatList} from 'react-native-gesture-handler';
import {foodObj} from '../../contexts/resource';
import firestore from '@react-native-firebase/firestore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';

import auth from '@react-native-firebase/auth';
const {width, height} = Dimensions.get('window');
const usersCollection = firestore().collection('Users');
const Account = ({navigation, route}: AccountScreenProps) => {
  const Auth = React.useContext(AuthContext);
  const [data, setData] = React.useState<any>();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  // variables
  const snapPoints = React.useMemo(() => ['1%', '40%'], []);
  // const profileImage = (filename: string) =>
  //   `https://firebasestorage.googleapis.com/v0/b/foodaddamain.appspot.com/o/${filename}`;

  // callbacks
  const handleSheetChanges = React.useCallback((fromIndex, toIndex) => {
    if (fromIndex == 1) bottomSheetRef.current?.close();
  }, []);

  const handleTextInput = (name: string) => (text: string) => {
    setDetails(prev => ({...prev, [name]: text}));
  };
  const OpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };
  const getData = async () => {
    let data = await getValue('orders');
    return data;
  };
  const getTotalCost = (list: Array<foodObj> | any) => {
    let total = 0;
    list.map((item: foodObj) => {
      if (item.count) total = total + item.price * item.count;
    });

    // console.log(total);
    return total;
  };
  React.useEffect(() => {
    getData().then(value => {
      if (value != null) {
        // console.log(value);
        setData(value);
      }
    });
  }, []);

  const [details, setDetails] = React.useState({
    name: '',
    email: '',
    address: '',
  });
  // const [image, setImage] = React.useState<any>(null);
  // const [uploading, setUploading] = React.useState<boolean>(false);
  // const [transferred, setTransferred] = React.useState<number>(0);
  const Header = () => (
    <>
      <View style={styles.titleBox}>
        <View>
          <Text style={styles.userName}>
            {Auth?.user.displayName ? Auth?.user.displayName : 'User Name'}
          </Text>
          <Text style={styles.phoneNumber}>{Auth?.user.phoneNumber}</Text>
        </View>
        <Pressable
          onPress={() => {
            OpenBottomSheet();
          }}>
          {/* {Auth?.user.photoURL ? (
            <Image
              source={{
                uri: profileImage(
                  'https://firebasestorage.googleapis.com/v0/b/foodaddamain.appspot.com/o/rn_image_picker_lib_temp_8eeb93e4-73d8-4fc0-a1df-56060e68f1b6.jpg',
                ),
                method: 'POST',
              }}
              style={{height: 60, width: 60}}
            />
          ) : (
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                backgroundColor: colors.white,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5 name="user-alt" size={35} color={colors.brown} />
            </View>
          )} */}
          <Text style={{color: colors.brown, fontWeight: '700'}}>EDIT</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>My Orders</Text>
    </>
  );
  // const selectImage = () => {
  //   const options: ImagePicker.ImageLibraryOptions = {
  //     maxWidth: 2000,
  //     maxHeight: 2000,
  //     mediaType: 'photo',
  //     // storageOptions: {
  //     //   skipBackup: true,
  //     //   path: 'images',
  //     // },
  //   };
  //   ImagePicker.launchImageLibrary(options, async response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorMessage) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else if (response.assets) {
  //       const source = {uri: response.assets[0].uri};
  //       console.log(source);
  //       setImage(source);
  //     }
  //   });
  // };

  // const uploadImage = async () => {
  //   if (image) {
  //     const {uri} = image;
  //     const filename = uri.substring(uri.lastIndexOf('/') + 1);
  //     const uploadUri =
  //       Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  //     setUploading(true);
  //     setTransferred(0);
  //     const task = storage().ref(filename).putFile(uploadUri);
  //     // set progress state
  //     task.on('state_changed', async snapshot => {
  //       console.log(await snapshot.ref.getDownloadURL());
  //       setTransferred(
  //         Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
  //       );
  //     });
  //     try {
  //       await task;
  //     } catch (e) {
  //       console.error(e);
  //     }
  //     setUploading(false);
  //     Alert.alert(
  //       'Photo uploaded!',
  //       'Your photo has been uploaded to Firebase Cloud Storage!',
  //     );
  //     setImage(null);
  //   }
  // };
  if (Auth?.user !== null)
    return (
      // <ScrollView style={styles.root}>
      <>
        {/* <View style={styles.subContainer}>
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
              text="View All"
              onPress={() => {
                console.log('hello');
              }}
            />
          </View> */}
        <View style={styles.subContainer}>
          <FlatList
            data={data}
            ListHeaderComponent={() => <Header />}
            keyExtractor={(item, index: number) => {
              return `${index}`;
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View
                style={{
                  padding: 4,
                  marginVertical: 5,
                  backgroundColor: colors.white,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.brown,
                  }}>{`Order Id: #45184484 ${index}`}</Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.brown,
                    marginTop: 5,
                  }}>{`Cost : ${getTotalCost(item)}`}</Text>
              </View>
            )}
            // renderItem={() => <Text>hello</Text>}
            ListFooterComponent={
              <FilledButton
                text="Log out"
                onPress={() => {
                  console.log('ehll');
                  Auth?.signOut();
                }}
              />
            }
          />
          {/* <FilledButton
            text="View All"
            onPress={() => {
              console.log('hello');
            }}
          /> */}
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={Auth?.user.displayName ? -1 : 1}
          snapPoints={snapPoints}
          onAnimate={handleSheetChanges}
          keyboardBehavior="fullScreen"
          keyboardBlurBehavior="restore"
          backdropComponent={props => <BottomSheetBackdrop {...props} />}>
          <View style={styles.bottomSheet}>
            <Text style={styles.sectionTitle}>Edit your profile</Text>
            {/* <View>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: colors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome5 name="user-alt" size={35} color={colors.brown} />
              </View>
            </View>
            <View style={{width: '40%', marginBottom: 10}}>
              <BorderButton
                text="upload image"
                onPress={() => {
                  // selectImage();
                }}
                fontSize={13}
              />
            </View> */}
            <TextInput
              placeholder="Name"
              placeholderTextColor={colors.brown}
              style={{borderBottomColor: colors.brown, borderBottomWidth: 1}}
              onChangeText={handleTextInput('name')}
            />
            <TextInput
              placeholder="email"
              placeholderTextColor={colors.brown}
              style={{borderBottomColor: colors.brown, borderBottomWidth: 1}}
              onChangeText={handleTextInput('email')}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Address"
              placeholderTextColor={colors.brown}
              style={{borderBottomColor: colors.brown, borderBottomWidth: 1}}
              onChangeText={handleTextInput('address')}
            />

            <FilledButton
              text="SAVE CHANGES"
              onPress={async () => {
                console.log(Auth?.user);
                // uploadImage();
                if (details.name !== '')
                  await auth().currentUser?.updateProfile({
                    displayName: details.name,
                  });
                if (details.name !== '')
                  await auth().currentUser?.updateEmail(details.email);
                if (Auth?.user.displayName) {
                  try {
                    await usersCollection
                      .doc(auth().currentUser?.uid)
                      .set(details);
                    Alert.alert(
                      'Profile Saved',
                      'Your Profile has been saved Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () => bottomSheetRef.current?.close(),
                        },
                      ],
                    );
                  } catch (error) {
                    throw error;
                  }
                } else {
                  try {
                    await usersCollection
                      .doc(auth().currentUser?.uid)
                      .update(details);
                    Alert.alert(
                      'Profile Saved',
                      'Your Profile has been saved Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () => bottomSheetRef.current?.close(),
                        },
                      ],
                    );
                  } catch (error) {
                    throw error;
                  }
                }
              }}
            />
            {/* {uploading && (
              <View style={styles.progressBarContainer}>
                <Progress.Bar progress={transferred} width={300} />
              </View>
            )} */}
          </View>
        </BottomSheet>
      </>
      // </ScrollView>
    );
  return <PhoneAuthForm />;
};

export default Account;

const styles = StyleSheet.create({
  root: {
    height: height,
    width: width,
    position: 'relative',
    backgroundColor: `${colors.gray}10`,
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
    backgroundColor: colors.white,
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
    backgroundColor: colors.green,
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
  progressBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
