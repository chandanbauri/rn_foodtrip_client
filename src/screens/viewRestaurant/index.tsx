import * as React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
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
const {height, width} = Dimensions.get('screen');
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

const ViewRestaurant = ({navigation, route}: RestaurantScreenProps) => {
  const [initializing, setInitializing] = React.useState<boolean>(true);
  const MAX_SCOLL_OFFSET = height * 0.1;

  const y = new Value<number>(0);

  let h = y.interpolate({
    inputRange: [0, MAX_SCOLL_OFFSET],
    outputRange: [height * 0.5, MAX_SCOLL_OFFSET],
    extrapolate: Extrapolate.CLAMP,
  });
  let scale = y.interpolate({
    inputRange: [0, MAX_SCOLL_OFFSET],
    outputRange: [2.5, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  let coverOpacity = y.interpolate({
    inputRange: [0, MAX_SCOLL_OFFSET],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  let OverLayOpacity = y.interpolate({
    inputRange: [0, MAX_SCOLL_OFFSET],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  let titleColor = interpolateColors(y, {
    inputRange: [0, MAX_SCOLL_OFFSET],
    outputColorRange: [colors.white, colors.brown],
  });

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const goBack = () => {
    navigation.goBack();
  };

  React.useEffect(() => {
    let timeOut = setTimeout(() => setInitializing(() => false), 2000);
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
        data={foodObj[0].itemlist}
        ListHeaderComponent={() => (
          <AnimatedHeader
            animatedHeight={{height: h}}
            coverScale={scale}
            coverOpacity={coverOpacity}
            OverLayOpacity={OverLayOpacity}
            titleColor={titleColor}
            goBack={() => {
              goBack();
            }}
          />
        )}
        keyExtractor={(item: any) => item?.id}
        renderItem={({item}: any) => <Food item={item} />}
        stickyHeaderIndices={[0]}
        ListFooterComponent={() => <View style={{height: 30}} />}
        style={{flex: 1}}
      />
    </View>
  );
};

export default ViewRestaurant;

const styles = StyleSheet.create({
  root: {
    height: height,
    width: width,
  },
});
