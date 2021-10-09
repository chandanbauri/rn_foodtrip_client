import * as React from 'react';
import {Pressable, StyleSheet, Text, View, FlatList} from 'react-native';
import {colors, getTotalCost} from '../../../utilities';
import Entypo from 'react-native-vector-icons/Entypo';
import FilledButton from '../../buttons/filled';
import {ResourceContext} from '../../../contexts/resource';
import moment from 'moment';
type props = {
  item: any;
  onCancel?: () => void;
  onRepeat?: () => void;
};
export default function OrderCard({item, onCancel, onRepeat}: props) {
  const {restaurantDetails, userDetails, items, partner, ...otherDetails} =
    item;
  const [expand, setExpand] = React.useState<boolean>(false);
  const Resource = React.useContext(ResourceContext);
  const FoodBox = ({name, count, cost}: any) => {
    return (
      <View style={styles.foodBox}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>{`${name.slice(
          0,
          15,
        )} (${count})`}</Text>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>{`₹ ${
          count * cost
        }`}</Text>
      </View>
    );
  };

  const RepeatOrder = () => {
    if (items && items.length) {
      Resource?.repeatOrder(items);
      Resource?.saveRestaurantDetils(restaurantDetails);
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.elevatedContainer}>
        <View style={styles.subContainer}>
          <View>
            <View style={styles.titleBar}>
              <Text style={[styles.title, styles.text]}>
                {`${restaurantDetails.name}`.slice(0, 20)}
              </Text>
              {item.isPending && (
                <Text
                  style={[
                    styles.text,
                    styles.caption,
                  ]}>{`Order is Pending`}</Text>
              )}
              {item.isRejected && (
                <Text
                  style={[
                    styles.text,
                    styles.caption,
                  ]}>{`Order was Rejected`}</Text>
              )}
              {item.isCanceled && (
                <Text
                  style={[
                    styles.text,
                    styles.caption,
                  ]}>{`Order is Canceled`}</Text>
              )}
              {item.isOnGoing && item.isPickedUp && (
                <Text
                  style={[
                    styles.text,
                    styles.caption,
                  ]}>{`Order is On the way `}</Text>
              )}
              {item.isOnGoing && !item.isPickedUp && (
                <Text
                  style={[
                    styles.text,
                    styles.caption,
                  ]}>{`Order is Preparing `}</Text>
              )}
              {item.isDelivered && (
                <Text
                  style={[
                    styles.text,
                    styles.caption,
                  ]}>{`Order was Delivered`}</Text>
              )}
            </View>
            <Text style={styles.text}>{`₹ ${
              getTotalCost(item.items) +
              parseInt(item.deliveryCharge ?? 0) +
              parseFloat(item.gst ?? 0)
            }`}</Text>
            {item.placedAt && (
              <View style={{marginTop: 10}}>
                <Text style={{color: colors.time_and_address, fontSize: 12}}>
                  ORDERED ON
                </Text>
                <Text
                  style={{
                    color: colors.divider,
                    marginTop: 5,
                    fontWeight: '700',
                    fontSize: 12,
                  }}>
                  {moment(item.placedAt).format('DD MMM YYYY [at] h:mm a')}
                </Text>
              </View>
            )}
          </View>

          {expand && (
            <View style={styles.foodBoxWrapper}>
              <FlatList
                data={items}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({item, index}) => <FoodBox {...item} />}
              />
              <View
                style={[
                  styles.foodBox,
                  {
                    borderTopColor: `${colors.brown}80`,
                    borderTopWidth: 1,
                    marginTop: 10,
                    paddingTop: 10,
                  },
                ]}>
                <Text
                  style={[styles.text, {fontWeight: 'bold'}]}>{`Total`}</Text>
                <Text
                  style={[
                    styles.text,
                    {fontWeight: 'bold'},
                  ]}>{`₹ ${getTotalCost(item.items)}`}</Text>
              </View>
              <View style={styles.foodBox}>
                <Text
                  style={[
                    styles.text,
                    {fontWeight: 'bold'},
                  ]}>{`Delivery Charge`}</Text>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>{`₹ ${
                  otherDetails.deliveryCharge ?? 0
                }`}</Text>
              </View>
              <View style={styles.foodBox}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>{`GST`}</Text>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>{`₹ ${
                  otherDetails.gst ?? 0
                }`}</Text>
              </View>
              <View style={styles.foodBox}>
                <Text
                  style={[
                    styles.text,
                    {fontWeight: 'bold'},
                  ]}>{`Grand Total`}</Text>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>{`₹ ${
                  getTotalCost(item.items) +
                  parseInt(item.deliveryCharge ?? 0) +
                  parseFloat(item.gst ?? 0)
                }`}</Text>
              </View>
              <View style={styles.actionBar}>
                <Pressable
                  onPress={() => {
                    // Resource?.EmptyCart();
                    RepeatOrder();
                  }}
                  style={[styles.repeatButton, {borderRadius: 4}]}>
                  <Text style={[{color: colors.white}, {fontSize: 12}]}>
                    Repeat Order
                  </Text>
                </Pressable>
                {/* {!item.isCanceled && item.isPending && (
                  <Pressable
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      backgroundColor: colors.error,
                      borderRadius: 4,
                    }}
                    onPress={() => {
                      if (onCancel) onCancel();
                    }}>
                    <Text style={{color: colors.white, fontSize: 12}}>
                      Cancel
                    </Text>
                  </Pressable>
                )} */}
              </View>
            </View>
          )}
        </View>
        <Pressable
          style={styles.expandButton}
          onPress={() => setExpand(prev => !prev)}>
          <Entypo
            name={expand ? `chevron-small-up` : `chevron-small-down`}
            size={24}
            color={colors.gray}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    padding: 5,
  },
  elevatedContainer: {
    backgroundColor: colors.white,
    elevation: 4,
  },
  subContainer: {
    flexDirection: 'column',

    padding: 10,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expandButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderTopWidth: 2,
    borderTopColor: `${colors.gray}70`,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  caption: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  text: {
    color: colors.brown,
  },
  foodBoxWrapper: {
    marginTop: 10,
  },
  actionBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: `${colors.brown}`,
  },
  foodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  repeatButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.brown,
  },
});
