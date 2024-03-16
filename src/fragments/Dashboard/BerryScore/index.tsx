import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import TextView from '@/components/TextView';
import theme from '@/theme';
import {usePokemon} from '@/hooks/usePokemon';
import {useAnimation} from '@/hooks/useAnimation';
import {styles} from './styles';

export default function BerryScore() {
  const {pokemon} = usePokemon();
  const {animateOpacityToggle} = useAnimation();
  const opacityAnimation = new Animated.Value(0);
  const isMounted = useRef(false);

  const oldExp = pokemon?.selected.prevExp!;
  const curExp = pokemon?.selected.currentExp!;
  const expDifference = curExp - oldExp;
  const sign = expDifference >= 0 ? '+' : '';

  const randomY = Math.random() * (400 - 200) - 400;
  const randomX = Math.random() * (250 - 50) + 50;

  useEffect(() => {
    if (isMounted.current) {
      animateOpacityToggle(opacityAnimation, 2000);
    } else {
      isMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon?.selected]);

  return (
    <Animated.View
      style={[
        styles.expPoint,
        {opacity: opacityAnimation, left: randomX, top: randomY},
      ]}>
      <TextView
        color={expDifference >= 0 ? theme.colors.success : theme.colors.error}
        fz={24}>
        {sign}
        {curExp - oldExp}
      </TextView>
    </Animated.View>
  );
}
