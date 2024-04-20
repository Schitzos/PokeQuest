import {Animated, Easing} from 'react-native';

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

  const animateShake = (shakeAnimation: Animated.Value, duration: number) => {
    const shakeSequence = [
      createAnimationTiming(shakeAnimation, -15, duration),
      createAnimationTiming(shakeAnimation, 0, duration),
      createAnimationTiming(shakeAnimation, -5, duration),
      createAnimationTiming(shakeAnimation, 0, duration),
    ];

    Animated.sequence(shakeSequence).start();
  };

  const animateWalkX = (animation: Animated.Value, duration: number) => {
    const xSequences = [
      [
        0, 0, -50, 50, -100, -500, -100, -50, 50, 100, -75, 0, 0, 50, 75, 100,
        50, 0,
      ],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [
        0, 0, 50, 150, 350, 750, 250, 0, -100, -50, 50, 0, 0, -50, -75, -100,
        -50, 0,
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

  const animateWalkY = (animation: Animated.Value, duration: number) => {
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
  const animateReverseX = (animation: Animated.Value, duration: number) => {
    return Animated.timing(animation, {
      toValue: counter % 2 === 0 ? 1 : 0,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      counter += 1;
    });
  };

  return {
    animateOpacityHidden,
    animateOpacityShow,
    animateOpacityToggle,
    animateShake,
    animateWalkX,
    animateWalkY,
    animateReverseX,
  };
}
