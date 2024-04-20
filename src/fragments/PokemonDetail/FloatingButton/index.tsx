import React, {useEffect} from 'react';
import {Animated, View} from 'react-native';
import {styles} from './styles';
import TextView from '@/components/TextView';
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
import {useAnimation} from '@/hooks/useAnimation';

export default function FloatingButton({
  color,
  handleChoosePokemon,
  spark,
}: {
  color: string | undefined;
  handleChoosePokemon: () => void;
  spark: boolean;
}) {
  const {animateShake} = useAnimation();

  useEffect(() => {
    animateShake(shakeAnimation, 500);
    const intervalId = setInterval(() => {
      animateShake(shakeAnimation, 500);
    }, 2000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
