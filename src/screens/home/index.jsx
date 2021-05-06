import React, { useLayoutEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.searchButton}
                    onPress={() => { }}
                >
                    <Feather name="search" size={25} color="#21BF73" />
                </TouchableOpacity>
            )
        })
    })
    return (
        <SafeAreaView style={styles.root}>
            <StatusBar backgroundColor="#21BF73" />
            <View style={styles.addressViewContainer}>
                <TouchableOpacity style={styles.addressView}>
                    <MaterialCommunityIcons name="map-marker-radius" size={24} />
                    <View style={styles.addressViewTextContainer}>
                        <Text style={styles.addressViewText}>Road 5 , Asansol</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryListContainer}>
                <View style={styles.categoryListHeaderContainer}><Text style={styles.categoryListHeader}>Categories</Text></View>
                <View style={styles.categoryList}>
                    {/* restauran cards goes here only the closest ones */}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchButton: {
        marginRight: 15,
    },
    addressViewContainer: {
        width: '100%',
        paddingLeft: 14,
        marginTop: 10,
    },
    addressView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    addressViewTextContainer: {
        marginLeft: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#21BF73',
        paddingBottom: 5,
    },
    addressViewText:{
        color: "#21BF73",
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 12,
    },
    categoryListContainer: {
        width: '100%',
    },
    categoryListHeaderContainer:{
        marginTop: 35,
        marginLeft: 18,
    },
    categoryListHeader:{
        color: "#929AAB",
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14,
    },
    categoryList:{
        backgroundColor: "#21BF7325",
        height: 200,
        width: '100%',
        marginTop: 10,
    }
})