import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Statistics from './Statistics';
import AdayDetayliIstatistik from './AdayDetayliIstatistik';

const Stack = createStackNavigator();


export default function App() {
    return (
        <Stack.Navigator initialRouteName="Statistics" screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Statistics"
                getComponent={() => Statistics}
                options={{
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="AdayDetayliIstatistik"
                getComponent={() => AdayDetayliIstatistik}
                options={{
                    gestureEnabled: true,
                }}
            />
        </Stack.Navigator>
    );
}