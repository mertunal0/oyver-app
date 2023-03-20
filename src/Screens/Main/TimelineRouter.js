import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Timeline from './Timeline';

const Stack = createStackNavigator();


export default function App() {
    return (
        <Stack.Navigator initialRouteName="Timeline" screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Timeline"
                getComponent={() => Timeline}
                options={{
                    gestureEnabled: true,
                }}
            />
        </Stack.Navigator>
    );
}