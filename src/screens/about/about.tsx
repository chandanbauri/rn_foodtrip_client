import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/statusBar';
import {AboutUsScreenProps} from '../../navigation/homeScreenStackNavigator/types';

const data = [
  {
    feild_title: 'ABOUT COMPANY',
    main_Description: `Food Dhaba is a Sikkim restaurant aggregator and food delivery company founded in 2021. It provides information, menus and food delivery options from various partner restaurants in selected cities of Sikkim.`,
  },
];

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  mainDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
  },
});
export default function AboutUsScreen({navigation, route}: AboutUsScreenProps) {
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#FFF"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={styles.root}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => (
            <View>
              <Text style={styles.title}>{item.feild_title}</Text>
              <Text style={styles.mainDescription}>
                {item.main_Description}
              </Text>
            </View>
          )}
        />
      </View>
    </>
  );
}
