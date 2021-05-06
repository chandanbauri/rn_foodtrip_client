import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../../screens/home'
const Stack = createStackNavigator()
const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
                headerTitle: `Food Trip`,
                headerTitleStyle: { color: '#21BF73', fontFamily: 'OpenSans-SemiBold' },
            }} />
        </Stack.Navigator>
    )
}


export default AuthNavigator