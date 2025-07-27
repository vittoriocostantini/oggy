import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodayTask from '../../screens/today-task/today-task';

const Stack = createStackNavigator();

export function TodayStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal', // Cambia la dirección del gesto
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen name="TodayMain" component={TodayTask} />
      {/* Aquí puedes agregar más pantallas del stack de today */}
      {/* <Stack.Screen name="TaskDetail" component={TaskDetail} /> */}
      {/* <Stack.Screen name="TaskEdit" component={TaskEdit} /> */}
    </Stack.Navigator>
  );
} 