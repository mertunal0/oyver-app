import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Oyver from './Oyver';

const Stack = createStackNavigator();


export default function App() {
    return (
        <Stack.Navigator initialRouteName="Oyver" screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Oyver"
                getComponent={() => Oyver}
                options={{
                    gestureEnabled: true,
                }}
            />
        </Stack.Navigator>
    );
}