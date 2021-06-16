import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import Food from '../../cards/food';
const {height, width} = Dimensions.get('window');

const FoodCategoryHeader = () => {
  const [activeTab, setActiveTab] = useState(1);

  const HeaderItem = ({item}) => {
    const isActive = activeTab === item.index;
    return (
      <TouchableOpacity
        onPress={() => {
          //setApp(prev => ({...prev, activeTabIndex: item.index}));
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
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
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
    paddingHorizontal: 5,
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
    color: '#21BF73',
  },
  activeItemIndicator: {
    backgroundColor: '#21BF73',
    width: (width * 25) / 100,
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
    title: 'Burger',
    index: 2,
  },
  {
    id: 3,
    title: 'Pizza',
    index: 3,
  },
  {id: 4, title: 'Pizza', index: 4},
  {
    id: 5,
    title: 'Pizza',
    index: 5,
  },
  {
    id: 6,
    title: 'Pizza',
    index: 6,
  },
];
