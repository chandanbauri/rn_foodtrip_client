import * as React from 'react';
import {Alert, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../../../../contexts/Auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/core';
import Loader from '../../../../components/loader/loader';
import FocusedStatusBar from '../../../../components/statusBar';
import FilledButton from '../../../../components/buttons/filled';
import {colors, getTotalCost} from '../../../../utilities';
import {cancelOrder} from '../../../../utilities/cloud/functions';
const usersCollection = firestore().collection('Users');
export default function OnGoingOrdersScreen() {
  const [data, setData] = React.useState<Array<any>>([]);
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const isFocused = useIsFocused();
  const Auth = React.useContext(AuthContext);
  const getData = async () => {
    try {
      let myOrders = await usersCollection
        .doc(Auth?.user?.uid)
        .collection('orders')
        .get();
      if (myOrders.size) {
        let allOrders: any = myOrders.docs.map((item: any, index) => ({
          id: item.id,
          ...item.data(),
        }));
        console.log(allOrders[0].isOnGoing);
        setData(allOrders.filter((item: any) => item.isOnGoing == true));
      } else {
        setData([]);
      }
    } catch (error) {
      setData([]);
      throw error;
    }
  };
  React.useEffect(() => {
    if (isFocused) {
      getData()
        .then(value => {
          if (value != null) {
            console.log('ORDERs', value);
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
        backgroundColor="transparent"
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: `${colors.brown}20`,
                marginVertical: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  paddingVertical: 10,
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.black,
                  }}>{`Order Id: ${item.id}`}</Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.black,
                    marginTop: 5,
                  }}>{`Cost : ₹ ${
                  getTotalCost(item.items) +
                  parseInt(item.deliveryCharge ?? 0) +
                  parseFloat(item.gst ?? 0)
                }`}</Text>
                {item.isPending && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.black,
                    }}>{`Order is Pending`}</Text>
                )}
                {item.isRejected && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.black,
                    }}>{`Order was Rejected`}</Text>
                )}
                {item.isCanceled && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.black,
                    }}>{`Order is Canceled`}</Text>
                )}
                {item.isOnGoing && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.black,
                    }}>{`Order is On the way`}</Text>
                )}
                {item.isDelivered && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.black,
                    }}>{`Order was Delivered`}</Text>
                )}
              </View>
              {!item.isCanceled && item.isPending && (
                <View>
                  <Pressable
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      backgroundColor: colors.error,
                      borderRadius: 4,
                    }}
                    onPress={async () => {
                      setInitializing(true);
                      try {
                        let res = await cancelOrder({orderID: item.id});
                        let response = JSON.parse(res.data);
                        if (response.success) {
                          setInitializing(false);
                          Alert.alert(
                            'Order Cancelation request added successfully',
                            '',
                            [
                              {
                                text: 'Ok',
                                onPress: () => {},
                              },
                            ],
                          );
                        } else {
                          setInitializing(false);
                          Alert.alert(
                            'There is some issue please try again later',
                            '',
                            [
                              {
                                text: 'Ok',
                                onPress: () => {},
                              },
                            ],
                          );
                        }
                      } catch (error) {
                        setInitializing(false);
                        Alert.alert(
                          'There is some issue please try again later',
                          '',
                          [
                            {
                              text: 'Ok',
                              onPress: () => {},
                            },
                          ],
                        );
                      }
                    }}>
                    <Text style={{color: colors.white, fontSize: 12}}>
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
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
  footerComponent: {},
});
