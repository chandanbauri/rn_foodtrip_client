import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from '../bottomTabNavigator'
const Stack = createStackNavigator()
const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={BottomNavigator} />
        </Stack.Navigator>
    )
}


export default AuthNavigator