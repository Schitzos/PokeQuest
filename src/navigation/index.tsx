import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import route from './route';

const Stack = createStackNavigator<RootStackParamList>(); // Specify the param list type

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={route.HomeScreen} />
        <Stack.Screen
          name="PokemonDetail"
          component={route.PokemonDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
