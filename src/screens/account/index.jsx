import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { withDecay } from 'react-native-reanimated'

const Account = ({ navigation }) => {
    return (
        <View style={styles.root}>
            <GuestUser />
        </View>
    )
}

export default Account

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    guestUserContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#BBBBBB10',
        width: '100%',
        paddingHorizontal: 14,
        paddingVertical: 15,
    },
    guestUserTitle:{
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18
    },
    guestUserSubtitle:{
        fontFamily: 'OpenSans',
        color: "#bbbbbb",
        fontSize: 12,
        marginTop: 2,
        marginBottom: 5,
    },
    guestUserText:{
        fontFamily: 'OpenSans',
        color: "#bbbbbb",
        fontSize: 14,
        textTransform: 'uppercase',
        marginBottom: 5
    },
    filledLoginButton:{
        paddingVertical: 12,
        paddingHorizontal: 35,
        marginTop: 10,
        backgroundColor: '#21BF73',
        alignItems: 'center',
        marginBottom: 50,
    },
    filledLoginButtonText:{
        color:'#fff',
        textTransform: 'uppercase',
        fontSize: 20,
        fontFamily: 'OpenSans-SemiBold'
    }
})

const GuestUser = () => (
    <View style={styles.guestUserContainer}>
        <Text style={styles.guestUserTitle}>{`FOOD DELIVERY ACCOUNT`}</Text>
        <Text style={styles.guestUserSubtitle}>{`To have delicious food quickly login/create an account`}</Text>
        <Pressable style={styles.filledLoginButton}>
            <Text style={styles.filledLoginButtonText}>Login</Text>
        </Pressable>
        <Text style={styles.guestUserText}>{`Privacy Policy`}</Text>
        <Text style={styles.guestUserText}>{`Help`}</Text>
    </View>
)