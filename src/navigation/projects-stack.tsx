import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Projects from '../screens/projects/projects';

const Stack = createStackNavigator();

export function ProjectsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProjectsMain" component={Projects} />
      {/* Aquí puedes agregar más pantallas del stack de proyectos */}
      {/* <Stack.Screen name="ProjectDetail" component={ProjectDetail} /> */}
      {/* <Stack.Screen name="CreateProject" component={CreateProject} /> */}
    </Stack.Navigator>
  );
} 