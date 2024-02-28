import {Animated, Easing} from 'react-native';

const createAnimationTiming = (
  animation: Animated.Value,
  toValue: number,
  duration: number,
  easing: any = Easing.linear,
) => {
  return Animated.timing(animation, {
    toValue,
    duration,
    easing,
    useNativeDriver: true,
  });
};

export const Shake = (shakeAnimation: Animated.Value, duration: number) => {
  const shakeSequence = [
    createAnimationTiming(shakeAnimation, 10, duration),
    createAnimationTiming(shakeAnimation, -10, duration),
    createAnimationTiming(shakeAnimation, 10, duration),
    createAnimationTiming(shakeAnimation, 0, duration),
  ];

  Animated.sequence(shakeSequence).start();
};

export const WalkX = (animation: Animated.Value, duration: number) => {
  const xSequences = [
    [
      0, 0, -50, 50, -100, -500, -100, -50, 50, 100, -75, 0, 0, 50, 75, 100, 50,
      0,
    ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [
      0, 0, 50, 150, 350, 750, 250, 0, -100, -50, 50, 0, 0, -50, -75, -100, -50,
      0,
    ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  return Animated.sequence(
    xSequences.map(xValues =>
      Animated.sequence(
        xValues.map(toValue =>
          Animated.timing(animation, {
            toValue,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ),
      ),
    ),
  );
};

export const WalkY = (animation: Animated.Value, duration: number) => {
  return Animated.sequence([
    Animated.timing(animation, {
      toValue: -20,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(animation, {
      toValue: 0,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]);
};

let counter = 0;
export const reverseX = (animation: Animated.Value, duration: number = 0) => {
  return Animated.timing(animation, {
    toValue: counter % 2 === 0 ? 1 : 0,
    duration: duration,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start(() => {
    counter += 1;
  });
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
