import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Restaurant from '../../cards/Restaurant'
import Food from '../../cards/food'

const RestaurantScrollView = ({ isRestaurant }) => {
    const data = [
        {
            id: 1,
        },
        {
            id: 2
        },
        {
            id: 3,
        },
        {
            id: 4
        },
        {
            id: 5,
        },
        {
            id: 6
        },
    ]
    return (
        <View style={styles.root}>
            <ScrollView style={styles.scrollView}>
                {isRestaurant ?
                    data.map((item, index) => (<Restaurant key={index} />))
                    : data.map((item, index) => (<Food key={index} info={item}/>))}
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