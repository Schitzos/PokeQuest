import {Animated} from 'react-native';

export const searchAnimation = new Animated.Value(0);

export const scrollY = new Animated.Value(0);

export const pokeballOpacity = scrollY.interpolate({
  inputRange: [0, 750], // Adjust the range as needed
  outputRange: [1, 0],
  extrapolate: 'extend',
});

export const pokeballOpacitySearch = searchAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 1],
  extrapolate: 'clamp',
});
