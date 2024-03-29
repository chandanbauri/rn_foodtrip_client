import * as React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {foodObj, ResourceContext} from '../../../contexts/resource';
import {colors} from '../../../utilities';
const {width} = Dimensions.get('window');

type props = {
  item: any;
  addToCardAction?: () => void;
  removeFromCardAction?: () => void;
  isInCartView?: boolean;
  id?: string;
  isClosed?: boolean;
};

function Food({
  item,
  addToCardAction,
  removeFromCardAction,
  isInCartView,
  id,
  isClosed,
}: props) {
  const Resource = React.useContext(ResourceContext);

  const [counter, setCounter] = React.useState<number>(0);
  React.useEffect(() => {
    const product = Resource?.findItemInTheCart(item.id);
    if (typeof product !== 'boolean' && product?.count)
      setCounter(product?.count);
    return;
  }, [Resource?.cart]);
  return (
    <View style={styles.root}>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}> */}
      {/* <View style={{height: 100, width: 100}}>
          {item.image && (
            <Image
              source={{
                uri: item.image,
              }}
              style={{flex: 1, resizeMode: 'cover', borderRadius: 10}}
            />
          )}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#00000020',
              borderRadius: 10,
            }}
          />
        </View> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>{`${item.name}`}</Text>
        <Text style={styles.detailsText}>{`₹ ${
          isInCartView ? item.cost * counter : item.cost
        }`}</Text>
        {/* </View> */}
      </View>
      {!isClosed &&
        (Resource?.findItemInTheCart(item.id) ? (
          <View style={styles.controllButtonsContainer}>
            <Pressable
              onPress={() => {
                setCounter(prev => {
                  if (Resource?.cart.length <= 1 && removeFromCardAction) {
                    removeFromCardAction();
                  }
                  prev === 1
                    ? Resource?.deleteItemFromCart(item.id)
                    : Resource?.updateItem({...item, count: prev - 1});
                  return prev - 1;
                });
              }}>
              <MaterialCommunityIcons
                name="minus-box-outline"
                size={24}
                color={colors.brown}
              />
            </Pressable>
            <Text>{counter}</Text>
            <Pressable
              onPress={() => {
                setCounter(prev => {
                  if (addToCardAction) addToCardAction();
                  Resource?.updateItem({...item, count: prev + 1});
                  return prev + 1;
                });
              }}>
              <MaterialCommunityIcons
                name="plus-box-outline"
                size={24}
                color={colors.divider}
              />
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => {
              if (
                Resource?.restaurantDetails &&
                Resource?.restaurantDetails.id == id
              ) {
                setCounter(1);
                if (addToCardAction) addToCardAction();
                Resource?.addToCart({...item, count: 1});
              } else if (!Resource?.restaurantDetails) {
                setCounter(1);
                if (addToCardAction) addToCardAction();
                Resource?.addToCart({...item, count: 1});
              } else if (
                Resource?.restaurantDetails &&
                Resource?.restaurantDetails.id !== id
              ) {
                Alert.alert(
                  'You can only order from one Restaurant at a time',
                  '',
                  [{text: 'OK', onPress: () => {}}],
                );
              }
            }}>
            <View
              style={{
                padding: 8,
                borderWidth: 1,
                borderColor: colors.brown,
                borderRadius: 100 / 2,
              }}>
              <AntDesign name="plus" size={24} color={colors.brown} />
            </View>
          </Pressable>
        ))}
    </View>
  );
}

export default Food;

const styles = StyleSheet.create({
  root: {
    // height: 120,
    height: 80,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailsContainer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  detailsTitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    fontWeight: '700',
    color: colors.logo_color,
    maxWidth: width * 0.6,
  },
  detailsText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
    fontWeight: '100',
    color: colors.time_and_address,
  },
  controllButtonsContainer: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#AAAAAA20',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#AAAAAA20',
  },
});
