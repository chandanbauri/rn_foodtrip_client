import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import {colors} from '../../../utilities';
import Food from '../../cards/food';
const {height, width} = Dimensions.get('window');

type props = {
  onOptionClick: (title: string, index: number) => void;
  categories: Array<any>;
  activeTab: number;
};

const FoodCategoryHeader = ({onOptionClick, categories, activeTab}: props) => {
  const HeaderItem = ({item, index}: any) => {
    const isActive = activeTab === index;
    return (
      <TouchableHighlight
        style={{
          alignItems: 'center',
          backgroundColor: colors.white,
          marginHorizontal: 5,
          justifyContent: 'space-between',
          height: 50,
        }}
        activeOpacity={0.1}
        underlayColor="#DDDDDD"
        onPress={() => {
          //setApp(prev => ({...prev, activeTabIndex: index}));
          if (onOptionClick) onOptionClick(item.text, index);
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.white,
            justifyContent: 'space-between',
            height: 50,
            width: '100%',
          }}>
          <View style={styles.itemRoot}>
            <Text
              style={[
                styles.itemText,
                isActive ? styles.activeItemText : styles.inactiveText,
              ]}>
              {item.text}
            </Text>
          </View>
          <View style={isActive ? styles.activeItemIndicator : {}} />
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <FlatList
      maxToRenderPerBatch={categories.length}
      style={{backgroundColor: colors.white}}
      initialScrollIndex={activeTab}
      initialNumToRender={categories.length}
      horizontal={true}
      data={categories}
      renderItem={({item, index}) => (
        <HeaderItem item={{text: item}} index={index} />
      )}
      keyExtractor={(item, index) => `${index}`}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default FoodCategoryHeader;

const styles = StyleSheet.create({
  root: {
    height: 50,
    width: width,
    backgroundColor: '#FFFFFF',
    borderBottomColor: `${colors.brown}40`,
    borderBottomWidth: 2,
  },
  //Header Item

  itemRoot: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '700',
  },
  activeItemText: {
    color: colors.logo_color,
  },
  activeItemIndicator: {
    backgroundColor: colors.divider,
    width: '100%',
    height: 3,
  },
  inactiveText: {
    color: '#C4C4C4',
  },
});

const itemList = [
  {
    id: 1,
    title: 'Pizza',
    index: 1,
  },
  {
    id: 2,
    title: 'Pizza1',
    index: 2,
  },
  {
    id: 3,
    title: 'Pizza2',
    index: 3,
  },
  {
    id: 4,
    title: 'Pizza3',
    index: 4,
  },
  {id: 5, title: 'Pizza4', index: 5},
  {
    id: 6,
    title: 'Pizza5',
    index: 6,
  },
];
