import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {foodObj, ResourceContext} from '../../../contexts/resource';
import {colors} from '../../../utilities';
import FilledButton from '../../buttons/filled';
import {CombinedNavigationProp} from '../../../navigation/types';

function CartInfo() {
  const Resource = React.useContext(ResourceContext);
  const [totalCost, setTotalCost] = React.useState<number>(0);
  React.useEffect(() => {
    if (Resource?.cart.length) {
      let total = 0;
      Resource.cart.map((item: foodObj) => {
        if (item.count) total = total + item.price * item.count;
      });
      setTotalCost(total);
    }
  }, [Resource?.cart]);
  const navigation = useNavigation<CombinedNavigationProp>();
  return (
    <View style={styles.root}>
      <View style={styles.costSection}>
        <Text style={styles.text}>Total cost</Text>
        <Text style={styles.text}>{`${totalCost}`}</Text>
      </View>
      <FilledButton
        text="Proceed"
        onPress={() => {
          navigation.navigate('Proceed', {grandTotal: totalCost});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
  },
  costSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text: {
    color: colors.brown,
    fontSize: 18,
  },
});

export default CartInfo;
