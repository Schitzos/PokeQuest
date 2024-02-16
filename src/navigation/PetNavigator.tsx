import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './types';
import route from './route';
import {RouteProp} from '@react-navigation/native';
import IconHome from '@assets/icons/icon-home-fix.svg';
import IconScroll from '@assets/icons/icon-scroll-fix.svg';
import IconUser from '@assets/icons/icon-user-fix.svg';
import theme from '@/theme';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native';

const Tab = createBottomTabNavigator<RootStackParamList>();

const tabIcons: any = {
  Journey: IconScroll,
  Profile: IconUser,
  Pet: (
    <View>
      <FastImage
        source={require('@assets/images/skyview.jpg')}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  ),
};

export default function PetNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={(props: {
        route: RouteProp<RootStackParamList, keyof RootStackParamList>;
        navigation: any;
      }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => {
          // const Icon = tabIcons[props.route.name];
          const iconColor = focused
            ? theme.colors.primary
            : theme.colors.neutral400;
          return (
            <FastImage
              source={require('@assets/images/pokeball.png')}
              style={{width: 24, height: 24, tintColor: iconColor}}
            />
          );
        },
        // tabBarIcon: ({focused}) => {
        //   const Icon = tabIcons[props.route.name];
        //   const iconColor = focused
        //     ? theme.colors.primary
        //     : theme.colors.neutral400;
        //   return <Icon width={24} height={24} color={iconColor} />;
        // },
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: theme.colors.neutral100,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.neutral500,
        headerShown: false,
      })}>
      <Tab.Screen
        name="Pet"
        component={route.DashboardScreen}
        options={{
          tabBarLabel: 'Home',
        }}
        initialParams={{action: 'dashboard'}}
        // initialParams={{exampleParam: 'Hello from Pet tab!', something: 'asd'}}
      />
      <Tab.Screen
        name="Feed"
        component={route.DashboardScreen}
        options={{
          tabBarLabel: 'Feed',
        }}
        initialParams={{action: 'feed'}}
      />
      <Tab.Screen
        name="Profile"
        component={route.DashboardScreen}
        initialParams={{action: 'remove'}}
      />
    </Tab.Navigator>
  );
}
