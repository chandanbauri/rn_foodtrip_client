import * as React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {foodObj, ResourceContext} from '../../../contexts/resource';
const {width} = Dimensions.get('window');
type props = {
  item: foodObj;
};

const Food = ({item}: props) => {
  const Resource = React.useContext(ResourceContext);

  const [counter, setCounter] = React.useState<number>(0);
  React.useEffect(() => {
    const product = Resource?.findItemInTheCart(item.id);
    if (typeof product !== 'boolean' && product?.count)
      setCounter(product?.count);
  }, []);
  return (
    <View style={styles.root}>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Domino’s Pizza</Text>
        <Text style={styles.detailsText}>₹ 350</Text>
      </View>
      {Resource?.findItemInTheCart(item.id) ? (
        <View style={styles.controllButtonsContainer}>
          <Pressable
            onPress={() => {
              setCounter(prev => {
                prev === 1
                  ? Resource?.deleteItemFromCart(item.id)
                  : Resource?.updateItem(item.id, prev - 1);
                return prev - 1;
              });
            }}>
            <MaterialCommunityIcons
              name="minus-box-outline"
              size={24}
              color="#21BF73"
            />
          </Pressable>
          <Text>{counter}</Text>
          <Pressable
            onPress={() => {
              setCounter(prev => {
                Resource?.updateItem(item.id, prev + 1);
                return prev + 1;
              });
            }}>
            <MaterialCommunityIcons
              name="plus-box-outline"
              size={24}
              color="#21BF73"
            />
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={() => {
            setCounter(1);
            Resource?.addToCart({...item, count: 1});
          }}>
          <SimpleLineIcons name="plus" size={35} color="#21BF73" />
        </Pressable>
      )}
    </View>
  );
};

export default Food;

const styles = StyleSheet.create({
  root: {
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
  },
  detailsTitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
    color: '#21BF73',
  },
  detailsText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
    color: '#21BF73',
  },
  controllButtonsContainer: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
