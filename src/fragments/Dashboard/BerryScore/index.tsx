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

  useEffect(() => {
    if (isMounted.current) {
      animateOpacityToggle(opacityAnimation, 1000);
    } else {
      isMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon?.selected]);
  return (
    <Animated.View style={[styles.expPoint, {opacity: opacityAnimation}]}>
      <TextView
        color={expDifference >= 0 ? theme.colors.success : theme.colors.error}
        fz={24}>
        {sign}
        {curExp - oldExp}
      </TextView>
    </Animated.View>
  );
}
