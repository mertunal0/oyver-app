import React, {Component,useState, useEffect} from 'react';
import {Text, View, StatusBar, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntIcons from 'react-native-vector-icons/AntDesign'
import MatIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import StatisticsRouter from './StatisticsRouter'
import TimelineRouter from './TimelineRouter'
import OyverRouter from './OyverRouter'
import AnketRouter from './AnketRouter'

const Tab = createBottomTabNavigator();

const MainRouter = () => {

  StatusBar.setBarStyle('dark-content', true);

  return (
    <Tab.Navigator
      initialRouteName="StatisticsRouter"
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#8b5e34",
        tabBarInactiveTintColor: "#C9C9C9",
        tabBarShowLabel: false,
        tabBarStyle: [{"display": "flex"}, null],
        headerShown: false,
        tabBarVisible: true,
        tabBarIcon: ({focused, color, size}) => {

          if (route.name === "StatisticsRouter") {
            return <AntIcons size={28} name="barschart" color={color} />;
          } else if (route.name === "TimelineRouter") {
            return <MatIcons size={28} name="rss-feed" color={color} />;
          } else if (route.name === 'OyverRouter') {
            return <MatIcons size={28} name="how-to-vote" color={color} />;
          } else if (route.name === 'AnketRouter') {
            return <FontAwesome5 size={28} name="poll-h" color={color} />;
          }
          
        },
      })}
      >
        <Tab.Screen name="OyverRouter" component={OyverRouter} />
        <Tab.Screen name="StatisticsRouter" component={StatisticsRouter} />
        <Tab.Screen name="TimelineRouter" component={TimelineRouter} />
        <Tab.Screen name="AnketRouter" component={AnketRouter} />
    </Tab.Navigator>
  );
};

export default MainRouter;
