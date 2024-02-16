import React, {useEffect} from 'react';
import {Animated, View} from 'react-native';
import {styles} from './styles';
import TextView from '@/components/TextView';
import {ShakeUpDown} from '@/utils/animation/shake';
import theme from '@/theme';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  handleBallAnimation,
  opacityHidden,
  resetBallAnimation,
  shakeAnimation,
  translateY,
} from './animation';
import {handleGestureEvent} from './function';

export default function FloatingButton({
  color,
  handleChoosePokemon,
  spark,
}: {
  color: string | undefined;
  handleChoosePokemon: () => void;
  spark: boolean;
}) {
  useEffect(() => {
    ShakeUpDown(shakeAnimation, 500);
    const intervalId = setInterval(() => {
      ShakeUpDown(shakeAnimation, 500);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!spark) {
      resetBallAnimation();
    }
  }, [spark]);

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={[styles.ballContainer, {backgroundColor: color}]}>
        <PanGestureHandler
          onHandlerStateChange={e =>
            handleGestureEvent(e, handleBallAnimation, handleChoosePokemon)
          }>
          <Animated.Image
            style={[
              styles.pokeball,
              {
                transform: [
                  {
                    translateY: Animated.add(
                      translateY,
                      shakeAnimation, // Include shakeAnimation here
                    ),
                  },
                ],
                opacity: opacityHidden,
              },
            ]}
            source={require('@assets/images/pokeball.png')}
          />
        </PanGestureHandler>
      </View>
      <TextView color={theme.colors.white}>Swipe Up To Choose..</TextView>
    </View>
  );
}
