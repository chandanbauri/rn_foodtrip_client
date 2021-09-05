import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Text, View, FlatList} from 'react-native';
import Food from '../../components/cards/food';
import AnimatedHeader from '../../components/header/animated';
import Animated, {
  Extrapolate,
  Value,
  interpolateColors,
} from 'react-native-reanimated';
import FocusedStatusBar from '../../components/statusBar';
import {RestaurantScreenProps} from '../../navigation/homeScreenStackNavigator/types';
import {colors} from '../../utilities';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {ResourceContext, useResource} from '../../contexts/resource';
import {getFoodList} from '../../utilities/cloud/functions';
import Entypo from 'react-native-vector-icons/Entypo';
import FoodCategoryHeader from '../../components/header/foodCategory';
const {height, width} = Dimensions.get('window');

const foodObj = [
  {
    categoryName: 'Pizza',
    itemlist: [
      {
        id: ' 1',
        name: "M'Pepeporni",
        price: 350,
      },
      {
        id: ' 2',
        name: "M'Pepeporni",
        price: 350,
      },
      {
        id: ' 3',
        name: "M'Pepeporni",
        price: 350,
      },
      {
        id: ' 4',
        name: "M'Pepeporni",
        price: 350,
      },
      {
        id: ' 5',
        name: "M'Pepeporni",
        price: 350,
      },
      {
        id: ' 6',
        name: "M'Pepeporni",
        price: 350,
      },
      {
        id: ' 7',
        name: "M'Pepeporni",
        price: 350,
      },
      {
        id: ' 8',
        name: "M'Pepeporni",
        price: 350,
      },
      {
        id: ' 9',
        name: "M'Pepeporni",
        price: 350,
      },
      {
        id: '10',
        name: "M'Pepeporni",
        price: 350,
      },
    ],
  },
  {
    categoryName: 'Pizza1',
    itemlist: [{id: '1', name: "M'Pepeporni", price: 350}],
  },
  {
    categoryName: 'Pizza2',
    itemlist: [
      {
        id: '1',
        name: "M'Pepeporni",
        price: 350,
      },
    ],
  },
  {
    categoryName: 'Pizza3',
    itemlist: [
      {
        id: '1',
        name: "M'Pepeporni",
        price: 350,
      },
    ],
  },
  {
    categoryName: 'Pizza4',
    itemlist: [{id: '1', name: "M'Pepeporni", price: 350}],
  },
];

function Loader() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={80} color={colors.brown} />
    </View>
  );
}

const y = new Value<number>(0);
// const MAX_SCOLL_OFFSET = height * 0.1;
// let h = y.interpolate({
//   inputRange: [0, MAX_SCOLL_OFFSET],
//   outputRange: [height * 0.5, MAX_SCOLL_OFFSET],
//   extrapolate: Extrapolate.CLAMP,
// });
// let scale = y.interpolate({
//   inputRange: [0, MAX_SCOLL_OFFSET],
//   outputRange: [2.5, 1],
//   extrapolate: Extrapolate.CLAMP,
// });
// let coverOpacity = y.interpolate({
//   inputRange: [0, MAX_SCOLL_OFFSET],
//   outputRange: [1, 0],
//   extrapolate: Extrapolate.CLAMP,
// });
// let OverLayOpacity = y.interpolate({
//   inputRange: [0, MAX_SCOLL_OFFSET],
//   outputRange: [1, 0],
//   extrapolate: Extrapolate.CLAMP,
// });
// let titleColor = interpolateColors(y, {
//   inputRange: [0, MAX_SCOLL_OFFSET],
//   outputColorRange: [colors.white, colors.brown],
// });

function ViewRestaurant({navigation, route}: RestaurantScreenProps) {
  const MainHeader = ({title}: any) => (
    <>
      <View
        style={{
          height: height * 0.1,
          width: width,
          backgroundColor: colors.white,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
        }}>
        <Pressable
          onPress={() => {
            goBack();
          }}>
          <View style={{paddingRight: 5, paddingVertical: 5}}>
            <Entypo name="chevron-left" size={24} color={colors.brown} />
          </View>
        </Pressable>
        <Text
          style={{
            color: colors.brown,
            fontSize: 22,
            marginLeft: 20,
            fontWeight: '700',
          }}>
          {title}
        </Text>
      </View>
      <FoodCategoryHeader onOptionClick={() => {}} />
    </>
  );
  const [initializing, setInitializing] = React.useState<boolean>(true);
  let trigger = React.useRef(false);
  let Resouce = useResource();
  const [foodList, setFoodList] = React.useState<Array<any>>([]);
  let list = React.useRef<Array<any>>([]);
  const {collection, id, name, address} = route.params;
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const goBack = () => {
    navigation.goBack();
  };

  const openBottomSheet = () => {
    trigger.current = true;
  };
  const closeBottomSheet = () => {
    trigger.current = false;
  };

  const fetchFoodList = async () => {
    try {
      let res = await getFoodList({parentName: collection, parentID: id});
      if (res.data) {
        list.current = JSON.parse(res.data);
        setFoodList(list.current);
        setInitializing(false);
      }
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    fetchFoodList().catch(error => {
      throw error;
    });
    return;
    // return clearTimeout(timeOut);
  }, []);
  if (initializing) return <Loader />;
  return (
    <View style={styles.root}>
      <FocusedStatusBar
        animated={true}
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AnimatedFlatList
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: y,
              },
            },
          },
        ])}
        data={foodList}
        ListHeaderComponent={() => (
          // <AnimatedHeader
          //   animatedHeight={{height: h}}
          //   coverScale={scale}
          //   coverOpacity={coverOpacity}
          //   OverLayOpacity={OverLayOpacity}
          //   titleColor={titleColor}
          //   title={name}
          //   goBack={() => {
          //     goBack();
          //   }}
          // />
          <MainHeader title={name} />
        )}
        keyExtractor={(item: any) => item?.id}
        renderItem={({item}: any) => (
          <Food
            id={id}
            item={item}
            addToCardAction={() => {
              if (!Resouce?.restaurantDetails) {
                Resouce?.saveRestaurantDetils({id, name, address});
                openBottomSheet();
              } else {
                if (
                  Resouce?.restaurantDetails &&
                  Resouce.restaurantDetails?.id == id
                ) {
                  openBottomSheet();
                } else {
                  Alert.alert(
                    'You can only order from one Restaurant at a time',
                    '',
                    [{text: 'OK', onPress: () => {}}],
                  );
                }
              }
            }}
            removeFromCardAction={() => {
              Resouce?.saveRestaurantDetils(null);
              closeBottomSheet();
            }}
          />
        )}
        stickyHeaderIndices={[0]}
        style={{flex: 1}}
      />
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        // onAnimate={handleSheetChanges}
        keyboardBehavior="fullScreen"
        keyboardBlurBehavior="restore"
        backdropComponent={props => <BottomSheetBackdrop {...props} />}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}>
          
        </View>
      </BottomSheet> */}
      <View
        style={{
          width: '100%',
          backgroundColor: colors.white,
          position: 'absolute',
          bottom: 0,
          paddingTop: 20,
        }}>
        <View style={{width: '100%', paddingHorizontal: 14}}>
          <Pressable
            style={{}}
            onPress={() => {
              if (trigger.current) navigation.navigate('BookOrder');
            }}>
            <View style={styles.gotoCartButton}>
              <Text
                style={{
                  fontSize: 18,
                  color: colors.white,
                }}>
                Proceed
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>{`Minimum order amount ₹ 150`}</Text>
        </View>
      </View>
    </View>
  );
}

export default ViewRestaurant;

const styles = StyleSheet.create({
  root: {
    // height: height,
    // width: width,
    flex: 1,
  },
  bottomTextContainer: {
    marginTop: 10,
    paddingVertical: 3,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  gotoCartButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: colors.brown,
    borderRadius: 10,
  },
});
