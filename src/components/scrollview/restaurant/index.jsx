import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Restaurant from '../../cards/Restaurant'
import Food from '../../cards/food'

const RestaurantScrollView = ({ isRestaurant }) => {
    const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    return (
        <View style={styles.root}>
            <ScrollView style={styles.scrollView}>
                {isRestaurant ?
                    data.map((item, index) => (<Restaurant key={index} />))
                    : data.map((item, index) => (<Food key={index} />))}
            </ScrollView>
        </View>
    )
}

export default RestaurantScrollView

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#BBBBBB30",
        paddingTop: 5,
    }
})