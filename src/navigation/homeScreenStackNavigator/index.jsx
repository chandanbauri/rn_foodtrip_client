import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../../screens/home'
import Search from '../../screens/home/search'
const Stack = createStackNavigator()
const HomeScreenStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
                headerTitle: `Food Trip`,
                headerTitleStyle: { color: '#21BF73', fontFamily: 'OpenSans-SemiBold' },
            }} />
            <Stack.Screen name="Search" component={Search} options={{headerTitle: ''}} />
        </Stack.Navigator>
    )
}

export default HomeScreenStack;