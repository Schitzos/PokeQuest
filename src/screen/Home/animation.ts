import {Animated, Easing} from 'react-native';

export const scrollY = new Animated.Value(0);

export const handleScroll = Animated.event(
  [{nativeEvent: {contentOffset: {y: scrollY}}}],
  {useNativeDriver: true},
);

export const translateY = scrollY.interpolate({
  inputRange: [0, 750],
  outputRange: [0, -265],
  extrapolate: 'clamp',
});

export const resetScrollY = () => {
  Animated.timing(scrollY, {
    toValue: 0,
    duration: 1000, // Adjust the duration as per your preference
    easing: Easing.linear, // Adjust the easing function if needed
    useNativeDriver: true,
  }).start();
};

export const defaultScrollY = () => {
  Animated.timing(scrollY, {
    toValue: 750,
    duration: 500, // Adjust the duration as per your preference
    easing: Easing.linear, // Adjust the easing function if needed
    useNativeDriver: true,
  }).start();
};
