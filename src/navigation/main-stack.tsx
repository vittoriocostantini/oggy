import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './tab-navigator';
import { AddStack } from './add-stack';
import { TodayStack } from './today-stack';

const Stack = createStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="AddStack" component={AddStack} />
      <Stack.Screen name="TodayStack" component={TodayStack} />
    </Stack.Navigator>
  );
} 