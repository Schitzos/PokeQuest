import {Animated} from 'react-native';

export const animateOpacityHidden = (animation: Animated.Value) => {
  Animated.timing(animation, {
    toValue: 0,
    duration: 300, // Adjust the duration as needed
    useNativeDriver: true,
  }).start();
};

export const animateOpacityShow = (animation: Animated.Value) => {
  Animated.timing(animation, {
    toValue: 1,
    duration: 300, // Adjust the duration as needed
    useNativeDriver: true,
  }).start();
};

export const animateOpacityToggle = (
  animation: Animated.Value,
  duration: number,
) => {
  Animated.timing(animation, {
    toValue: 1,
    duration: 500, // Adjust the duration as needed
    useNativeDriver: true,
  }).start(() => {
    setTimeout(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();
    }, duration);
  });
};

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
  backgroundColor: Animated.Value,
) => {
  opacityHidden.setValue(1);
  opacityShow.setValue(0);
  backgroundColor.setValue(0);
};
