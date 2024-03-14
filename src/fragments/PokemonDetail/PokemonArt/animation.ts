import {Animated} from 'react-native';

export const animateBackgroundColor = (animation: Animated.Value) => {
  Animated.timing(animation, {
    toValue: 1,
    duration: 300, // Adjust the duration as needed
    useNativeDriver: true, // useNativeDriver: false for backgroundColor
  }).start();
};

export const resetAnimations = (
  opacityHidden: Animated.Value,
  opacityShow: Animated.Value,
) => {
  opacityHidden.setValue(1);
  opacityShow.setValue(0);
};
