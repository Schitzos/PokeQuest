import React from 'react';
import {Animated} from 'react-native';
import {styles} from './styles';
import {OnBoardingProps} from './type';

export default function OnBoarding({translateY, children}: OnBoardingProps) {
  const logoOpacity = translateY.interpolate({
    inputRange: [-265, 0], // Adjusted inputRange
    outputRange: [0, 1], // Adjusted outputRange
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.infoContainer,
        {
          transform: [
            {
              translateY: translateY,
            },
          ],
        },
      ]}>
      <Animated.Image
        style={[styles.appLogo, {opacity: logoOpacity}]}
        source={require('@assets/images/app_logo.png')}
      />
      {children}
    </Animated.View>
  );
}
