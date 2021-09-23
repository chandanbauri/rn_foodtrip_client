import * as React from 'react';
import {Alert, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import FocusedStatusBar from '../../../../components/statusBar';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../../../components/loader/loader';
import {useIsFocused} from '@react-navigation/native';
import {AuthContext} from '../../../../contexts/Auth';
import {colors, getTotalCost} from '../../../../utilities';
import {cancelOrder} from '../../../../utilities/cloud/functions';
import OrderCard from '../../../../components/cards/order';
const usersCollection = firestore().collection('Users');
export default function PendingOrdersScreen() {
  const [data, setData] = React.useState<Array<any>>([]);
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const isFocused = useIsFocused();
  const Auth = React.useContext(AuthContext);
  const getData = async () => {
    try {
      let myOrders = await usersCollection
        .doc(Auth?.user?.uid)
        .collection('orders')
        .orderBy('createdAt', 'desc')
        .get();
      if (myOrders.size) {
        let allOrders: any = myOrders.docs.map((item: any, index) => ({
          id: item.id,
          ...item.data(),
        }));
        setData(allOrders.filter((item: any) => item.isPending == true));
      } else {
        setData([]);
      }
    } catch (error) {
      setData([]);
      throw error;
    }
  };
  const OnCancelOrder = async (item: any) => {
    setInitializing(true);
    try {
      let res = await cancelOrder({orderID: item.id});
      if (res) {
        let response = JSON.parse(res.data);
        if (response.success) {
          setInitializing(false);
          Alert.alert('Order Cancelation request added successfully', '', [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ]);
        } else {
          setInitializing(false);
          Alert.alert('There is some issue please try again later', '', [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ]);
        }
      }
    } catch (error) {
      setInitializing(false);
      Alert.alert('There is some issue please try again later', '', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    }
  };
  React.useEffect(() => {
    if (isFocused) {
      getData()
        .then(value => {
          if (value != null) {
            setData(value);
          }
          setInitializing(false);
        })
        .catch(error => {
          setInitializing(false);
          throw error;
        });
    } else {
      setInitializing(true);
    }
    return;
  }, [isFocused]);
  if (initializing)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#FFF"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={styles.root}>
        <FlatList
          data={data}
          keyExtractor={(item, index: number) => {
            return `${index}`;
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <OrderCard
              item={item}
              onCancel={() => {
                OnCancelOrder(item);
              }}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
