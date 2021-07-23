import * as React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Text, View, FlatList} from 'react-native';
import Food from '../../components/cards/food';
import AnimatedHeader from '../../components/header/animated';
import Animated, {Extrapolate, Value} from 'react-native-reanimated';
import FocusedStatusBar from '../../components/statusBar';
import {RestaurantScreenProps} from '../../navigation/homeScreenStackNavigator/types';
const {height, width} = Dimensions.get('window');
const foodObj = [
  {
    categoryName: 'Pizza',
    itemlist: [
      {
        id: ' 1',
        name: "M'Pepeporni",
      },
      {
        id: ' 2',
        name: "M'Pepeporni",
      },
      {
        id: ' 3',
        name: "M'Pepeporni",
      },
      {
        id: ' 4',
        name: "M'Pepeporni",
      },
      {
        id: ' 5',
        name: "M'Pepeporni",
      },
      {
        id: ' 6',
        name: "M'Pepeporni",
      },
      {
        id: ' 7',
        name: "M'Pepeporni",
      },
      {
        id: ' 8',
        name: "M'Pepeporni",
      },
      {
        id: ' 9',
        name: "M'Pepeporni",
      },
      {
        id: '10',
        name: "M'Pepeporni",
      },
    ],
  },
  {
    categoryName: 'Pizza1',
    itemlist: [{id: '1', name: "M'Pepeporni"}],
  },
  {
    categoryName: 'Pizza2',
    itemlist: [
      {
        id: '1',
        name: "M'Pepeporni",
      },
    ],
  },
  {
    categoryName: 'Pizza3',
    itemlist: [
      {
        id: '1',
        name: "M'Pepeporni",
      },
    ],
  },
  {
    categoryName: 'Pizza4',
    itemlist: [{id: '1', name: "M'Pepeporni"}],
  },
];

const ViewRestaurant = ({navigation, route}: RestaurantScreenProps) => {
  const y = new Value<number>(0);

  let h = y.interpolate({
    inputRange: [0, 80],
    outputRange: [350, 80],
    extrapolate: Extrapolate.CLAMP,
  });
  let scale = y.interpolate({
    inputRange: [0, 80],
    outputRange: [3, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  let coverOpacity = y.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  let mainTitleOpacity = y.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  let secondaryTitleOpacity = y.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.root}>
      <FocusedStatusBar
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
        data={foodObj[0].itemlist}
        ListHeaderComponent={() => (
          <AnimatedHeader
            animatedHeight={{height: h}}
            coverScale={scale}
            coverOpacity={coverOpacity}
            mainTitleOpactiy={mainTitleOpacity}
            goBack={() => {
              goBack();
            }}
          />
        )}
        keyExtractor={(item: any) => item?.id}
        renderItem={({item}: any) => <Food item={item} />}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

export default ViewRestaurant;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
