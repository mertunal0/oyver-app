import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './Register'
import PrivacyPolicy from './PrivacyPolicy'

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
            <Stack.Screen
                name="PrivacyPolicy"
                getComponent={() => PrivacyPolicy}
                options={{
                    gestureEnabled: true,
                }}
            />

        </Stack.Navigator>
    );
}