import * as React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors, isAvailable} from '../../../utilities';

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
        <View style={{height: 100, width: 100}}>
          {values.image && (
            <Image
              source={{
                uri: values.image,
              }}
              style={{flex: 1, resizeMode: 'cover', borderRadius: 10}}
            />
          )}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#00000020',
              borderRadius: 10,
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
            {values.restaurantName.slice(0, 15)}
          </Text>
          {values.tags && (
            <Text style={styles.detailsText}>
              {values.tags.slice(0, 2).join(' . ')}
            </Text>
          )}
          <Text style={styles.detailsText}>{`${
            values.preparationDuration
          } . ${values.address.slice(0, 10)}...`}</Text>
          <Text style={[styles.detailsText, styles.ordeOnlineText]}>
            {values.opening
              ? isAvailable(values.opening, values.closing)
                ? 'Order online'
                : `Available from ${values.opening} - ${values.closing}`
              : 'will be available soon'}
          </Text>
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
    color: colors.brown,
  },
  detailsText: {
    fontFamily: 'OpenSans',
    fontSize: 13,
    color: colors.brown,
  },
  ordeOnlineText: {
    fontWeight: 'bold',
    color: colors.purple,
  },
});
