import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
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
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => {
          //setApp(prev => ({...prev, activeTabIndex: index}));
          if (onOptionClick) onOptionClick(item.text, index);
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
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.root}>
      <FlatList
        horizontal={true}
        data={categories}
        renderItem={({item, index}) => (
          <HeaderItem item={{text: item}} index={index} />
        )}
        keyExtractor={(item, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default FoodCategoryHeader;

const styles = StyleSheet.create({
  root: {
    height: 40,
    width: width,
    backgroundColor: '#FFFFFF',
    borderBottomColor: `${colors.brown}40`,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  //Header Item

  itemRoot: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 4,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '700',
  },
  activeItemText: {
    color: colors.brown,
  },
  activeItemIndicator: {
    backgroundColor: colors.brown,
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
