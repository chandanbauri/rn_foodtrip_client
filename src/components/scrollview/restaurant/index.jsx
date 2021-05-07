import React, { StyleSheet, View, ScrollView } from 'react-native'
import Restaurant from '../../cards/Restaurant'


const RestaurantScrollView = () => {
    return (
        <View style={styles.root}>
            <ScrollView style={styles.scrollView}>
                <Restaurant />
            </ScrollView>
        </View>
    )
}

export default RestaurantScrollView

const styles = StyleSheet.create({
    root: {

    }
})