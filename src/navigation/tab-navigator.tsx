import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/home';
import TodayTask from '../screens/today-task/today-task';
import AddProject from '../screens/add-project/add-project';
import Projects from '../screens/projects/projects';
import Team from '../screens/team/team';
import { CustomTabBar } from '../components/composite/custom-tab-bar/custom-tab-bar';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Today" component={TodayTask} />
      <Tab.Screen name="Add" component={AddProject} />
      <Tab.Screen name="Projects" component={Projects} />
      <Tab.Screen name="Team" component={Team} />
    </Tab.Navigator>
  );
} 