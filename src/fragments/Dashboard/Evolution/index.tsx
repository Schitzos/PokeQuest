import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {usePokemon} from '@/hooks/usePokemon';
import FastImage from 'react-native-fast-image';
import TextView from '@/components/TextView';
import theme from '@/theme';

export default function Evolution({
  viewEvolveAnimate,
  viewEvolveSpark,
}: {
  viewEvolveSpark: Animated.Value;
  viewEvolveAnimate: Animated.Value;
}) {
  const {pokemon} = usePokemon();

  return (
    <Animated.View style={[styles.base, {opacity: viewEvolveAnimate}]}>
      <View style={styles.evolveContainer}>
        <View style={styles.evolveWrapper}>
          <FastImage
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.detail.id}.png`,
              priority: FastImage.priority.high,
            }}
            style={styles.artEvolve}
            defaultSource={require('@assets/images/default_image_loading.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <TextView color={theme.colors.white} fz={24}>
            {pokemon.selected.pokemonName}
          </TextView>
        </View>
      </View>
      <Animated.View
        style={[styles.evolveContainer, {opacity: viewEvolveSpark}]}>
        <View style={styles.evolveWrapper}>
          <FastImage
            source={require('@assets/images/evolve-animation.gif')}
            style={styles.artEvolveSpark}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  evolveContainer: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  evolveWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  artEvolve: {
    width: 300,
    height: 300,
  },
  artEvolveSpark: {
    width: 500,
    height: 500,
  },
});
