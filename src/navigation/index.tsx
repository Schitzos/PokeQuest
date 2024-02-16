import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import route from './route';
import PetNavigator from './PetNavigator';

const Stack = createStackNavigator<RootStackParamList>(); // Specify the param list type

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Preload'}>
        <Stack.Screen name="Preload" component={route.PreloadScreen} />
        <Stack.Screen
          name="Home"
          component={route.HomeScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={route.PokemonDetailScreen}
        />
        <Stack.Screen
          name="PetNavigator"
          component={PetNavigator}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
