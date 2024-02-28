import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated, Platform} from 'react-native';
import TextView from '@/components/TextView';
import theme from '@/theme';
import {usePokemon} from '@/hooks/usePokemon';
import {animateOpacityToggle} from '@/fragments/PokemonDetail/PokemonArt/animation';

export interface ListBerryDataResponse {
  results: any;
  count: number;
  previous: string | null;
  next: string | null;
}

export default function BerryScore() {
  const {pokemon} = usePokemon();
  const opacityAnimation = new Animated.Value(0);
  const isMounted = useRef(false);

  const oldExp = pokemon.selected.prevExp;
  const curExp = pokemon.selected.currentExp;
  const expDifference = curExp - oldExp;
  const sign = expDifference >= 0 ? '+' : '';

  useEffect(() => {
    if (isMounted.current) {
      animateOpacityToggle(opacityAnimation, 1000);
    } else {
      isMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.selected]);
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

const styles = StyleSheet.create({
  expPoint: {
    zIndex: 4000,
    position: 'absolute',
    top: Platform.OS === 'ios' ? -410 : -450,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 16,
    left: 250,
  },
});
