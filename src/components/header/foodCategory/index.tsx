import React, {useState} from 'react';
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
  onOptionClick: (title: string) => void;
};

const FoodCategoryHeader = ({onOptionClick}: props) => {
  const [activeTab, setActiveTab] = useState(1);

  const HeaderItem = ({item}: any) => {
    const isActive = activeTab === item.index;
    return (
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => {
          //setApp(prev => ({...prev, activeTabIndex: item.index}));
          onOptionClick(item.title);
          setActiveTab(prev => item.index);
        }}>
        <View style={styles.itemRoot}>
          <Text
            style={[
              styles.itemText,
              isActive ? styles.activeItemText : styles.inactiveText,
            ]}>
            {item.title}
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
        data={itemList}
        renderItem={HeaderItem}
        keyExtractor={item => item.id.toString()}
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
    marginVertical: 5,
  },
  //Header Item

  itemRoot: {
    flex: 1,
    width: (width * 25) / 100,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: (width * 22) / 100,
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
