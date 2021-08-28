import * as React from 'react';
import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../utilities';

type props = {
  //   y: Animated.Value<number>;
  animatedHeight: any;
  coverScale: any;
  coverOpacity: any;
  OverLayOpacity: any;
  titleColor: any;
  goBack: () => void;
  title: string;
};

const {height, width} = Dimensions.get('window');
const MIN_HEADER_HEIGHT = height * 0.25;

export default function AnimatedHeader({
  animatedHeight,
  coverScale,
  coverOpacity,
  OverLayOpacity,
  titleColor,
  goBack,
  title,
}: props) {
  return (
    <Animated.View style={[styles.root, animatedHeight]}>
      <Animated.View
        style={[
          styles.cover,
          {transform: [{scale: coverScale}], opacity: coverOpacity},
        ]}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=714&q=80',
          }}
          style={{flex: 1}}
        />
      </Animated.View>
      <Animated.View style={[styles.overlay, {opacity: OverLayOpacity}]} />
      <View style={styles.headerComponent}>
        <Animated.Text style={[styles.title, {color: titleColor}]}>
          {title}
        </Animated.Text>
        <Pressable
          style={styles.headerLeft}
          onPress={() => {
            goBack();
          }}>
          <Entypo name="chevron-left" size={24} color={colors.brown} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: MIN_HEADER_HEIGHT,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    marginBottom: 5,
    paddingVertical: 10,
    elevation: 10,
  },
  cover: {
    flex: 1,
  },
  overlay: {
    backgroundColor: '#00000050',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerComponent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    // backgroundColor: '#00000050',
    paddingTop: 15,
  },
  headerLeft: {
    position: 'absolute',
    top: height * 0.035,
    left: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 30,
  },
  borderContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
  },
});
