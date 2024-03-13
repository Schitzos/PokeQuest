import React from 'react';
import {Animated} from 'react-native';
import {pokeballOpacity, pokeballOpacitySearch} from './animation';
import {styles} from './styles';
import {OnBoardingProps} from './type';

export default function OnBoarding({
  translateY,
  searchTranslateY,
  search,
  children,
}: OnBoardingProps) {
  return (
    <Animated.View
      style={[
        styles.infoContainer,
        {
          transform: [{translateY: Animated.add(translateY, searchTranslateY)}],
        },
      ]}>
      <Animated.Image
        style={[
          styles.appLogo,
          {opacity: search ? pokeballOpacitySearch : pokeballOpacity},
        ]}
        source={require('@assets/images/app_logo.png')}
      />
      {children}
    </Animated.View>
  );
}
