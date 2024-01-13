import {Animated, Easing} from 'react-native';

export const Shake = (shakeAnimation: any, duration: number) => {
  Animated.sequence([
    Animated.timing(shakeAnimation, {
      toValue: 10,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: -10,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: 10,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: 0,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]).start();
};

export const ShakeUpDown = (shakeAnimation: any, duration: number) => {
  Animated.sequence([
    Animated.timing(shakeAnimation, {
      toValue: -15,
      duration: duration,
      easing: Easing.ease,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: 0,
      duration: duration,
      easing: Easing.ease,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: -5,
      duration: duration,
      easing: Easing.ease,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: 0,
      duration: duration,
      easing: Easing.ease,
      useNativeDriver: true,
    }),
  ]).start();
};
