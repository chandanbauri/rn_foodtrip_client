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
import {colors, getValue} from '../../utilities';
import {FlatList} from 'react-native-gesture-handler';
import {foodObj} from '../../contexts/resource';

const {width, height} = Dimensions.get('window');
const Account = ({navigation, route}: AccountScreenProps) => {
  const Auth = React.useContext(AuthContext);
  const [data, setData] = React.useState<any>();
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
  const Header = () => (
    <>
      <View style={styles.titleBox}>
        <View>
          <Text style={styles.userName}>
            {Auth?.user.displayName ? Auth?.user.displayName : 'User Name'}
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

      <Text style={styles.sectionTitle}>My Orders</Text>
    </>
  );
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
});
