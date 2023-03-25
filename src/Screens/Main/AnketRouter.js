import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Anketler from './Anketler';
import AnketPage from './AnketPage';

const Stack = createStackNavigator();


export default function App() {
    return (
        <Stack.Navigator initialRouteName="Anketler" screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Anketler"
                getComponent={() => Anketler}
                options={{
                    gestureEnabled: true,
                }}
            />
            <Stack.Screen
                name="AnketPage"
                getComponent={() => AnketPage}
                options={{
                    gestureEnabled: true,
                }}
            />
        </Stack.Navigator>
    );
}