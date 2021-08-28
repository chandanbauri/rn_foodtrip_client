import * as React from 'react';
import {
  ActivityIndicator,
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

const {height, width} = Dimensions.get('window');
export default function ProceedingScreen({
  navigation,
  route,
}: ProceedScreenProps) {
  const {grandTotal} = route.params;
  const [isCOD, setIsCOD] = React.useState<boolean>(false);
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
            <Text style={styles.textContent}>{grandTotal}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Select a Payment Method</Text>
            <View>
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  value={!isCOD}
                  onValueChange={() => {
                    setIsCOD(false);
                  }}
                />
                <Text style={styles.textContent}>Pay Online</Text>
              </View>
            </View>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                value={isCOD}
                onValueChange={() => {
                  setIsCOD(true);
                }}
              />
              <Text style={styles.textContent}>COD</Text>
            </View>
          </View>
          <View>
            <FilledButton
              text="Book Now"
              onPress={async () => {
                if (isCOD) {
                  let OrderList: Array<any> = [];
                  // console.log(await getValue('orders'));
                  //setValue(null, 'orders');
                  if (Resource?.cart) {
                    if (
                      (await getValue('orders')) !== null &&
                      Resource?.cart.length > 0
                    ) {
                      let value = await getValue('orders');
                      OrderList.push(Resource?.cart, ...value);
                      Resource?.EmptyCart();
                      setValue(OrderList, 'orders');
                    } else if (
                      (await getValue('orders')) == null &&
                      Resource?.cart.length > 0
                    ) {
                      OrderList.push(Resource?.cart);
                      setValue(OrderList, 'orders');
                    }
                  }
                  navigation.navigate('Account');
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
