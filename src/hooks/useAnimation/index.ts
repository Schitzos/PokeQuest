import {Animated} from 'react-native';

export function useAnimation() {
  const animateOpacityHidden = (
    animation: Animated.Value,
    duration?: number,
  ) => {
    Animated.timing(animation, {
      toValue: 0,
      duration: duration || 300,
      useNativeDriver: true,
    }).start();
  };

  const animateOpacityShow = (animation: Animated.Value, duration?: number) => {
    Animated.timing(animation, {
      toValue: 1,
      duration: duration || 300,
      useNativeDriver: true,
    }).start();
  };

  const animateOpacityToggle = (
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

  return {
    animateOpacityHidden,
    animateOpacityShow,
    animateOpacityToggle,
  };
}
