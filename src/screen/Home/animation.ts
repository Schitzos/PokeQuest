import {Animated} from 'react-native';

export const searchAnimation = new Animated.Value(0);

export const scrollY = new Animated.Value(0);

export const handleScroll = Animated.event(
  [{nativeEvent: {contentOffset: {y: scrollY}}}],
  {useNativeDriver: true}, // Set to true if you want to use native driver (not supported for all properties)
);

export const translateY = scrollY.interpolate({
  inputRange: [0, 750], // Adjust the range as needed
  outputRange: [0, -265],
  extrapolate: 'clamp',
});

export const pokeballOpacity = scrollY.interpolate({
  inputRange: [0, 750], // Adjust the range as needed
  outputRange: [1, 0],
  extrapolate: 'extend',
});

export const searchTranslateY = searchAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 0],
  extrapolate: 'identity',
});

export const pokeballOpacitySearch = searchAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 1],
  extrapolate: 'clamp',
});
