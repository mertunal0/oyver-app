import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './Register'

const Stack = createStackNavigator();

export default function LoginRouter() {
    return (
        <Stack.Navigator initialRouteName="Register" screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Register"
                getComponent={() => Register}
                options={{
                    gestureEnabled: true,
                }}
            />

        </Stack.Navigator>
    );
}