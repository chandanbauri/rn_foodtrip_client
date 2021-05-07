import React, { useLayoutEffect } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
const { width } = Dimensions.get('window');
const Search = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable
                    style={styles.headerBackButton}
                    onPress={() => {navigation.navigate('Home')}}
                >
                    <Feather name="arrow-left" size={24} color="#21BF73" />
                </Pressable>
            )
        })
    })
    return (
        <View style={styles.root}>
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="Search your favourite Food or Restaurant"
                        placeholderTextColor="#21BF73"
                        style={styles.searchBarTextInput}
                    />
                </View>
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerBackButton: {
        marginLeft: 14,
    },
    searchBarContainer: {
        width: width,
        marginTop: 2,
        paddingHorizontal: 14,
    },
    searchBar: {
        borderWidth: 2,
        borderColor: '#21BF73',
        width: '100%',
        marginTop: 2,
    },
    searchBarTextInput:{
        paddingLeft: 10,
    }
})