import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ProceedScreenProps} from '../../../navigation/BookOrder/types';
import {colors, getValue, setValue} from '../../../utilities';
import CheckBox from '@react-native-community/checkbox';
import FilledButton from '../../../components/buttons/filled';
import {ResourceContext} from '../../../contexts/resource';
import {
  createOrder,
  generateOrderID,
  verifyPaymentRazorPay,
} from '../../../utilities/cloud/functions';
import {config} from '../../../utilities/razorpay';
import RazorpayCheckout from 'react-native-razorpay';
import auth from '@react-native-firebase/auth';

const {height, width} = Dimensions.get('window');
export default function ProceedingScreen({
  navigation,
  route,
}: ProceedScreenProps) {
  const {grandTotal, alternatePhone, address} = route.params;
  const [isCOD, setIsCOD] = React.useState<boolean>(false);
  const [isOnline, setIsOnline] = React.useState<boolean>(true);
  const Resource = React.useContext(ResourceContext);

  // React.useEffect(() => {
  //   if (!Resource?.cart.length) {
  //     navigation.navigate('Home');
  //   }
  // });
  if (Resource?.cart.length)
    return (
      <View style={styles.root}>
        <View style={styles.content}>
          <View style={styles.detailsSection}>
            <Text style={styles.textContent}>{`Grand Total`}</Text>
            <Text style={styles.textContent}>{`₹ ${grandTotal}`}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Select a Payment Method</Text>
            <View>
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  value={isOnline}
                  onValueChange={() => {
                    setIsOnline(prev => !prev);
                    setIsCOD(prev => !prev);
                  }}
                />
                <Text style={styles.textContent}>Pay Online</Text>
              </View>
            </View>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                value={isCOD}
                onValueChange={() => {
                  setIsOnline(prev => !prev);

                  setIsCOD(prev => !prev);
                }}
              />
              <Text style={styles.textContent}>COD</Text>
            </View>
          </View>
          <View>
            <FilledButton
              text="Book Now"
              onPress={async () => {
                if (isCOD && !isOnline) {
                  let OrderList: Array<any> = [];
                  //setValue(null, 'orders');
                  if (Resource?.cart) {
                    // if (
                    //   (await getValue('orders')) !== null &&
                    //   Resource?.cart.length > 0
                    // ) {
                    //   let value = await getValue('orders');
                    //   OrderList.push(Resource?.cart, ...value);
                    //   Resource?.EmptyCart();
                    //   setValue(OrderList, 'orders');
                    // } else if (
                    //   (await getValue('orders')) == null &&
                    //   Resource?.cart.length > 0
                    // ) {
                    //   OrderList.push(Resource?.cart);
                    //   setValue(OrderList, 'orders');
                    // }
                    const ORDER = {
                      amount: grandTotal,
                      currency: 'INR',
                      paymentMethod: 'COD',
                      amountPaid: false,
                      razorpayDetails: null,
                      items: Resource?.cart,
                      userDetails: {
                        deliveryAddress: address,
                        phone: auth().currentUser?.phoneNumber,
                        name: auth().currentUser?.displayName,
                        uid: auth().currentUser?.uid,
                        alternatePhone: alternatePhone,
                      },
                      restaurantDetails: {
                        ...Resource.restaurantDetails,
                      },
                      isPending: true,
                      isCanceled: false,
                      isOnGoing: false,
                      isDelivered: false,
                      isRejected: false,
                    };
                    try {
                      let res = await createOrder({order: ORDER});
                      let response = JSON.parse(res.data);
                      if (response.success) {
                        Alert.alert('Order is Placed successfully', '', [
                          {
                            text: 'OK',
                            onPress: () => {
                              Resource?.EmptyCart();
                              Resource?.saveRestaurantDetils(null);
                              navigation.navigate('Account');
                            },
                          },
                        ]);
                      } else {
                        Alert.alert('Sorry Can not place order right now', '', [
                          {
                            text: 'OK',
                            onPress: () => {},
                          },
                        ]);
                      }
                    } catch (error) {
                      Alert.alert('Sorry Can not place order right now', '', [
                        {
                          text: 'OK',
                          onPress: () => {},
                        },
                      ]);
                      throw error;
                    }
                  }
                } else if (isOnline && !isCOD) {
                  try {
                    // {
                    //   data: {
                    //     amount: 85000,
                    //     amount_due: 85000,
                    //     amount_paid: 0,
                    //     attempts: 0,
                    //     created_at: 1630146419,
                    //     currency: 'INR',
                    //     entity: 'order',
                    //     id: 'order_HqaJ5lGJ2ydlDi',
                    //     notes: [],
                    //     offer_id: null,
                    //     receipt: null,
                    //     status: 'created',
                    //   },
                    //   msg: 'Order created',
                    //   success: true,
                    // };
                    let res = await generateOrderID({
                      orderAmount: grandTotal * 100,
                      currency: 'INR',
                    });
                    let data = JSON.parse(res.data);
                    var options = {
                      name: 'some prod',
                      image: '',
                      description: 'some desc',
                      order_id: data.data.id,
                      amount: data.data.amount,
                      currency: data.data.currency,
                      key: config.keyID,
                      prefill: {
                        email: auth().currentUser?.email,
                        contact: auth().currentUser?.phoneNumber?.slice(3),
                        name: auth().currentUser?.displayName,
                      },
                      theme: {color: colors.brown},
                    };
                    await RazorpayCheckout.open(options)
                      .then(async (transaction: any) => {
                        const validSignature = await verifyPaymentRazorPay({
                          orderID: data.data.id,
                          transaction: transaction,
                        });
                        let paymentSuccess = JSON.parse(validSignature.data);
                        if (paymentSuccess.validSignature) {
                          const ORDER = {
                            amount: grandTotal,
                            currency: data.data.currency,
                            paymentMethod: 'RAZORPAY',
                            amountPaid: true,
                            razorpayDetails: {
                              id: data.data.id,
                            },
                            items: Resource?.cart,
                            userDetails: {
                              deliveryAddress: address,
                              phone: auth().currentUser?.phoneNumber,
                              name: auth().currentUser?.displayName,
                              uid: auth().currentUser?.uid,
                              alternatePhone: alternatePhone,
                            },
                            restaurantDetails: {
                              ...Resource.restaurantDetails,
                            },
                            isPending: true,
                            isCanceled: false,
                            isOnGoing: false,
                            isDelivered: false,
                            isRejected: false,
                          };
                          try {
                            let res = await createOrder({order: ORDER});
                            let response = JSON.parse(res.data);
                            if (response.success) {
                              Alert.alert('Order is Placed successfully', '', [
                                {
                                  text: 'OK',
                                  onPress: () => {
                                    Resource?.EmptyCart();
                                    Resource?.saveRestaurantDetils(null);
                                    navigation.navigate('Account');
                                  },
                                },
                              ]);
                            } else {
                              Alert.alert(
                                'Sorry Can not place order right now',
                                '',
                                [
                                  {
                                    text: 'OK',
                                    onPress: () => {},
                                  },
                                ],
                              );
                            }
                          } catch (error) {
                            Alert.alert(
                              'Sorry Can not place order right now',
                              '',
                              [
                                {
                                  text: 'OK',
                                  onPress: () => {},
                                },
                              ],
                            );
                            throw error;
                          }
                        }
                      })
                      .catch(() => {
                        Alert.alert('Sorry Can not place order right now', '', [
                          {
                            text: 'OK',
                            onPress: () => {},
                          },
                        ]);
                      });
                  } catch (error) {
                    Alert.alert('Sorry Can not place order right now', '', [
                      {
                        text: 'OK',
                        onPress: () => {},
                      },
                    ]);
                    throw error;
                  }
                } else if (!isCOD && !isOnline) {
                  Alert.alert('Please slecet a valid payment Method', '', [
                    {
                      text: 'OK',
                      onPress: () => {},
                    },
                  ]);
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  else
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color={colors.brown} size="large" />
      </View>
    );
}

const styles = StyleSheet.create({
  root: {
    height: height,
    width: width,
    justifyContent: 'flex-end',
  },
  container: {
    marginTop: 10,
  },
  content: {
    marginBottom: height * 0.1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContent: {
    fontSize: 18,
    color: colors.brown,
  },
  title: {
    fontSize: 20,
    color: colors.gray,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
});
