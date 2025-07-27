import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from '../tab-navigator';
import { TodayStack } from '../stack/today-stack';
import { AddTaskStack } from '../stack/task-stack';

const Stack = createStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="TaskStack" component={AddTaskStack} />
      <Stack.Screen name="TodayStack" component={TodayStack} />
    </Stack.Navigator>
  );
} 