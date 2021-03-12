
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './Screens/SearchScreen';
import ResultScreen from './Screens/ResultsScreen';
import DetailsScreen from './Screens/DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Search Screen"
          component={SearchScreen}
        />
        <Stack.Screen
          name="Results"
          component={ResultScreen}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
