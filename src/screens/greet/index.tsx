import * as React from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilledButton from '../../components/buttons/filled';
import FocusedStatusBar from '../../components/statusBar';
import {GreetScreenProps} from '../../navigation/authNavigator/types';
import {colors} from '../../utilities';

const {height, width} = Dimensions.get('window');
export default function GreetScreen({navigation, route}: GreetScreenProps) {
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#D17755"
        barStyle="light-content"
        translucent={true}
      />
      <View style={styles.root}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons name="fast-food" size={50} color={colors.brown} />
          <View
            style={{
              marginLeft: 10,
              borderLeftColor: colors.brown,
              borderLeftWidth: 1,
              paddingLeft: 10,
            }}>
            <Text style={styles.text}>Order</Text>
            <Text style={styles.text}>your favourite food</Text>
            <Text style={styles.text}>online</Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 14,
            position: 'absolute',
            bottom: height * 0.05,
          }}>
          <FilledButton
            text="Explore"
            onPress={() => {
              navigation.navigate('Main', {
                screen: 'TabNav',
                params: {
                  screen: 'Home',
                },
              });
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 18,
    color: colors.brown,
    textTransform: 'capitalize',
    fontWeight: '700',
  },
});
