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
import FocusedStatusBar from '../../components/statusBar';
import {SafeAreaView} from 'react-native-safe-area-context';

const {height, width} = Dimensions.get('window');
function Cart({navigation}: CartScreenProps) {
  // const bottomSheetRef = React.useRef<BottomSheet>(null);
  // const snapPoints = React.useMemo(() => [150, 200], []);
  const Auth = React.useContext(ResourceContext);

  if (Auth && Auth?.cart && Auth?.cart?.length) {
    return (
      <>
        <SafeAreaView>
          <FocusedStatusBar
            backgroundColor="#FFF"
            barStyle="dark-content"
            translucent={true}
          />
          <FlatList
            data={Auth?.cart}
            ListHeaderComponent={Header}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Food item={item} isInCartView={true} />}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <View style={{paddingBottom: 20}}>
                <CartInfo />
              </View>
            )}
            stickyHeaderIndices={[0]}
          />
        </SafeAreaView>
      </>
    );
  }
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#FFF"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={styles.root}>
        <EmptyCart
          onClick={() => {
            navigation.navigate('Home');
          }}
        />
      </View>
    </>
  );
}

export default Cart;

const styles = StyleSheet.create({
  root: {
    height: height,
    width: width,
    backgroundColor: colors.white,
  },

  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartText: {
    color: colors.logo_color,
    fontWeight: 'bold',
    fontSize: 12,
  },
  visitNearByRestaurantButton: {
    borderWidth: 2,
    borderColor: colors.divider,
    paddingVertical: 12,
    paddingHorizontal: 35,
    marginTop: 10,
  },
  visitNearByRestaurantButtonText: {
    color: colors.logo_color,
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartHeader: {
    height: height * 0.07,
    width: width,
    backgroundColor: colors.white,
    elevation: 0,
    justifyContent: 'center',
    paddingLeft: 12,
    // paddingTop: 15,
  },
  cartHeaderTitle: {
    fontSize: 25,
    fontWeight: '300',
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
