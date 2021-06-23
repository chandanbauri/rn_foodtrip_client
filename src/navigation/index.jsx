import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './authNavigator'
import RNBootSplash from "react-native-bootsplash";
const APP = () => {
    useEffect(() => {
        RNBootSplash.hide({ fade: true });
    })
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    )
}

export default APP;