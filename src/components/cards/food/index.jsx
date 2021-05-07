import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const { width } = Dimensions.get('window')
const Food = () => {
    return (
        <View style={styles.root}>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Domino’s Pizza</Text>
                <Text style={styles.detailsText}>₹ 350</Text>
            </View>
            <Pressable 
             onPress={()=>{}}
            >
                <SimpleLineIcons name="plus" size={35} color="#21BF73"/>
            </Pressable>
        </View>
    )
}

export default Food

const styles = StyleSheet.create({
    root: {
        height: 80,
        width: width,
        backgroundColor: '#fff',
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
    },
    detailsContainer: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    detailsTitle: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 15,
        color: '#21BF73',
    },
    detailsText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 13,
        color: '#21BF73'
    }
})