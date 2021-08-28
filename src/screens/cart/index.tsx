import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import Food from '../../components/cards/food';
import {foodObj, ResourceContext} from '../../contexts/resource';
import {CartScreenProps} from '../../navigation/BookOrder/types';
import BottomSheet from '@gorhom/bottom-sheet';
import {colors} from '../../utilities';
import CartInfo from '../../components/bottomSheet/cart';

const {height, width} = Dimensions.get('window');
function Cart({navigation}: CartScreenProps) {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => [150, 200], []);
  const Auth = React.useContext(ResourceContext);

  if (Auth?.cart.length) {
    return (
      <>
        <View style={styles.root}>
          <FlatList
            data={Auth?.cart}
            ListHeaderComponent={() => <Header />}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Food item={item} isInCartView={true} />}
            ListFooterComponent={() => (
              <View>
                <CartInfo />
              </View>
            )}
          />
        </View>
        {/* <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          keyboardBehavior="fullScreen"
          keyboardBlurBehavior="restore">
         
        </BottomSheet> */}
      </>
    );
  }
  return (
    <View style={styles.root}>
      <EmptyCart
        onClick={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
}

export default Cart;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },

  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartText: {
    color: colors.brown,
    fontWeight: 'bold',
    fontSize: 12,
  },
  visitNearByRestaurantButton: {
    borderWidth: 2,
    borderColor: colors.brown,
    paddingVertical: 12,
    paddingHorizontal: 35,
    marginTop: 10,
  },
  visitNearByRestaurantButtonText: {
    color: colors.brown,
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartHeader: {
    height: height * 0.1,
    width: width,
    backgroundColor: colors.white,
    elevation: 10,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  cartHeaderTitle: {
    fontSize: 35,
    color: colors.brown,
  },
});

const Header = () => (
  <View style={styles.cartHeader}>
    <Text style={styles.cartHeaderTitle}>Cart</Text>
  </View>
);

const EmptyCart = ({onClick}: any) => (
  <View style={styles.emptyCartContainer}>
    <View style={{alignItems: 'center', marginTop: 100}}>
      <Text style={styles.emptyCartText}>{`Your cart is empty`}</Text>
      <Text style={styles.emptyCartText}>{`Add something from the menu`}</Text>
      <Pressable
        style={styles.visitNearByRestaurantButton}
        onPress={() => {
          onClick();
        }}>
        <Text
          style={
            styles.visitNearByRestaurantButtonText
          }>{`Check out near by Restaurants`}</Text>
      </Pressable>
    </View>
  </View>
);
