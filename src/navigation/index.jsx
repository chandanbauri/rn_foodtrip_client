import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './authNavigator'

const APP = () => {
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    )
}

export default APP;