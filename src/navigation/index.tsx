import React, {useRef} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {RootStackParamList} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import route from './route';
import analytics from '@react-native-firebase/analytics';

const Stack = createStackNavigator<RootStackParamList>(); // Specify the param list type

export default function Navigation() {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string | undefined>();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef?.getCurrentRoute()?.name;
        if (previousRouteName !== currentRouteName) {
          routeNameRef.current = currentRouteName;
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName={'Preload'}>
        <Stack.Screen name="Preload" component={route.PreloadScreen} />
        <Stack.Screen
          name="Home"
          component={route.HomeScreen}
          options={{gestureEnabled: false, gestureDirection: 'horizontal'}}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={route.PokemonDetailScreen}
        />
        <Stack.Screen
          name="Dashboard"
          component={route.DashboardScreen}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
