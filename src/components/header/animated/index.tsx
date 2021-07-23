import * as React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../utilities';

type props = {
  //   y: Animated.Value<number>;
  animatedHeight: any;
  coverScale: any;
  coverOpacity: any;
  mainTitleOpactiy: any;
  goBack: () => void;
};

const {height, width} = Dimensions.get('window');
const MIN_HEADER_HEIGHT = height * 0.3;

export default function AnimatedHeader({
  animatedHeight,
  coverScale,
  coverOpacity,
  mainTitleOpactiy,
  goBack,
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
      <View style={styles.headerComponent}>
        <Animated.Text style={styles.title}>Domino's</Animated.Text>
      </View>
      <Pressable
        style={styles.headerLeft}
        onPress={() => {
          goBack();
        }}>
        <Entypo name="chevron-left" size={24} color={colors.green} />
      </Pressable>
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
    backgroundColor: '#000000',
  },
  headerComponent: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  headerLeft: {
    position: 'absolute',
    top: 27,
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
    color: colors.green,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: colors.white,
    borderRadius: 50,
  },
});
