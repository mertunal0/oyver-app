import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginRouter from './src/Screens/Login/LoginRouter';
import MainRouter from './src/Screens/Main/MainRouter';
import Services from "./src/Util/Service";
import Splash from './src/Screens/Splash/SplashScreen';
import AsyncBus from './src/Util/AsyncBus';
import OyverRouter from './src/Screens/Main/OyverRouter';
import SecimSecimi from './src/Screens/SecimSecimi/SecimSecimi'
import {requestUserPermission} from './src/Util/NotificationService'

const Stack = createStackNavigator();

export default class App extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = () => 
    {
        requestUserPermission();
    }

    render() {
        return(
            <NavigationContainer>
            <Stack.Navigator initialRouteName = "Splash" screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="Splash"
                    getComponent={() => Splash}
                    options={{
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="LoginRouter"
                    getComponent={() => LoginRouter}
                    options={{
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="SecimSecimi"
                    getComponent={() => SecimSecimi}
                    options={{
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="MainRouter"
                    getComponent={() => MainRouter}
                    options={{
                        gestureEnabled: false,
                    }}
                />
            </Stack.Navigator>
            </NavigationContainer>
        )
    }
}