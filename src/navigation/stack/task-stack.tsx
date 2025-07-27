import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddTask from '../../screens/task/add-task';
const Stack = createStackNavigator();

export function AddTaskStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AddTaskMain" component={AddTask} />
      {/* Aquí puedes agregar más pantallas del stack de agregar */}
      {/* <Stack.Screen name="ProjectForm" component={ProjectForm} /> */}
      {/* <Stack.Screen name="ProjectSettings" component={ProjectSettings} /> */}
    </Stack.Navigator>
  );
} 
