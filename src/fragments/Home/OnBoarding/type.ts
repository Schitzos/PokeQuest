import React from 'react';
import {Animated} from 'react-native';

export type OnBoardingProps = {
  translateY: Animated.AnimatedInterpolation<string | number>;
  searchTranslateY: Animated.AnimatedInterpolation<string | number>;
  search: string;
  children: React.ReactNode;
};
