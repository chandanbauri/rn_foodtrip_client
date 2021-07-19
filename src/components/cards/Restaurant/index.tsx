import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type props = {
  onClick: () => void;
  values: any;
};

const {width} = Dimensions.get('screen');
const Sekelton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        justifyContent="flex-start"
      />
      <SkeletonPlaceholder.Item height={60} width={60} />
    </SkeletonPlaceholder>
  );
};
const Restaurant = ({onClick, values}: props) => {
  if (values)
    return (
      <Pressable style={styles.root} onPress={onClick}>
        <Image
          source={{
            uri: 'https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800',
          }}
          style={{height: 100, width: 100, resizeMode: 'cover'}}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Domino’s Pizza</Text>
          <Text style={styles.detailsText}>Indian . Chineese</Text>
          <Text style={styles.detailsText}>2 km . Court more</Text>
          <Text style={styles.detailsText}>Order online</Text>
        </View>
      </Pressable>
    );
  else {
    return (
      <View style={styles.root}>
        <Sekelton />
      </View>
    );
  }
};

export default Restaurant;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    height: 120,
    width: width,
    paddingHorizontal: 14,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailsContainer: {
    marginLeft: 10,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  detailsTitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    color: '#21BF73',
  },
  detailsText: {
    fontFamily: 'OpenSans',
    fontSize: 13,
    color: '#21BF73',
  },
});
