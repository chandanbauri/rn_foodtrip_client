import * as React from 'react';
import {
  Dimensions,
  Image,
  ImageProps,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import {color} from 'react-native-reanimated';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors, isAvailable} from '../../../utilities';

type props = {
  onClick: () => void;
  values: any;
};
const GrayscaledImage = (imageProps: ImageProps) => (
  <Grayscale amount={2} style={{height: 100, width: 100}}>
    <Image {...imageProps} />
  </Grayscale>
);
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
          {values.opening
            ? isAvailable(values.opening, values.closing)
              ? values.image && (
                  <Image
                    source={{
                      uri: values.image,
                    }}
                    style={{flex: 1, resizeMode: 'cover', borderRadius: 10}}
                  />
                )
              : values.image && (
                  <GrayscaledImage
                    source={{
                      uri: values.image,
                    }}
                    style={{flex: 1, resizeMode: 'cover', borderRadius: 10}}
                  />
                )
            : values.image && (
                <GrayscaledImage
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
              borderRadius: 10,
              zIndex: 10,
              opacity: 0.3,
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
            {values.restaurantName.slice(0, 40)}
          </Text>
          {values.tags && (
            <Text style={styles.detailsText}>
              {values.tags.slice(0, 2).join(' . ')}
            </Text>
          )}
          <Text
            style={[
              styles.detailsText,
              {color: colors.time_and_address},
            ]}>{`${values.preparationDuration} . ${values.address}`}</Text>
          <Text
            style={[
              styles.detailsText,
              values.opening
                ? isAvailable(values.opening, values.closing)
                  ? styles.ordeOnlineText
                  : {color: colors.closed, fontWeight: 'bold'}
                : {color: colors.closed, fontWeight: 'bold'},
            ]}>
            {values.opening
              ? isAvailable(values.opening, values.closing)
                ? 'Order online'
                : `Closed`
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
    marginVertical: 5,
  },
  detailsContainer: {
    marginLeft: 10,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  detailsTitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.logo_color,
  },
  detailsText: {
    fontFamily: 'OpenSans',
    fontSize: 13,
    color: colors.type_color,
  },
  ordeOnlineText: {
    fontWeight: 'bold',
    color: colors.order_online,
  },
});
