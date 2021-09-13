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
import {useIsFocused} from '@react-navigation/core';
import Loader from '../../components/loader/loader';
const {height, width} = Dimensions.get('window');

// function Loader() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <ActivityIndicator size={80} color={colors.brown} />
//     </View>
//   );
// }

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
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const [categories, setCategories] = React.useState<Array<any>>([]);
  const [activeTab, setActiveTab] = React.useState<number>(1);
  let trigger = React.useRef(false);
  let Resouce = useResource();
  const [foodList, setFoodList] = React.useState<Array<any>>([]);
  const [tabList, setTabList] = React.useState<Array<any>>([]);
  const {collection, id, name, address} = route.params;
  let isFocuses = useIsFocused();
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

  const extractCategories = (list: Array<any>) => {
    let raw = list.map(item => item.category);
    return [...new Set(raw)];
  };
  const fetchFoodList = async () => {
    try {
      let res = await getFoodList({parentName: collection, parentID: id});
      if (res.data) {
        let list = await JSON.parse(res.data);
        let catList = extractCategories(list);
        setFoodList(list);
        setCategories(catList);
        let items = list.filter((item: any) => item.category == catList[0]);
        setActiveTab(0);
        setTabList(items);
        setInitializing(false);
      }
    } catch (error) {
      throw error;
    }
  };

  const onCategoryClick = (categoryName: string, index: number) => {
    let list = foodList.filter(item => item.category == categoryName);
    setActiveTab(index);
    setTabList(list);
  };

  React.useEffect(() => {
    if (isFocuses)
      fetchFoodList().catch(error => {
        throw error;
      });
    return;
    // return clearTimeout(timeOut);
  }, []);
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
          {title.slice(0, 18)}
        </Text>
      </View>
      <FoodCategoryHeader
        categories={categories}
        onOptionClick={(title, index) => {
          onCategoryClick(title, index);
        }}
        activeTab={activeTab}
      />
    </>
  );
  if (initializing) return <Loader />;
  return (
    <>
      <FocusedStatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={styles.root}>
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
          data={tabList}
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
            <Text
              style={styles.bottomText}>{`Minimum order amount ₹ 150`}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default ViewRestaurant;

const styles = StyleSheet.create({
  root: {
    // height: height,
    // width: width,
    flex: 1,
    marginTop: 10,
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
