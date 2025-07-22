import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddProject from '../screens/add-project/add-project';

const Stack = createStackNavigator();

export function AddStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AddProjectMain" component={AddProject} />
      {/* Aquí puedes agregar más pantallas del stack de agregar */}
      {/* <Stack.Screen name="ProjectForm" component={ProjectForm} /> */}
      {/* <Stack.Screen name="ProjectSettings" component={ProjectSettings} /> */}
    </Stack.Navigator>
  );
} 