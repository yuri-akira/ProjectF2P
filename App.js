
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './Screens/SearchScreen';
import ResultScreen from './Screens/ResultScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    // TODO Stack.Screen for the Details Screen 
    <NavigationContainer>
      <Stack.Navigator
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Search Screen"
          component={SearchScreen}
        />
        <Stack.Screen
          name="Results"
          component={ResultScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
