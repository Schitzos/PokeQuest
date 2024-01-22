import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  getDetailPokemon,
  getSpeciesPokemon,
} from '@/services/pokemon/pokemon.service';
import {
  PokemonDetailDataResponse,
  PokemonSpeciesDataResponse,
  PokemonSpriteProps,
} from './type';
import FastImage from 'react-native-fast-image';
import TextView from '@/components/TextView';
import theme from '@/theme';

export default function PokemonSprite({
  name,
  currentState,
}: PokemonSpriteProps) {
  const pokemonSpecies = getSpeciesPokemon({
    name: name,
    key: ['getSpeciesPokemon', name],
  });

  const species = (pokemonSpecies?.data || {}) as PokemonSpeciesDataResponse;

  const pokemonDetail = getDetailPokemon({
    id: species ? species?.id?.toString() : '',
    key: ['getDetailPokemon', species ? species?.id?.toString() : ''],
  });

  const detail = (pokemonDetail?.data || {}) as PokemonDetailDataResponse;

  const imageUrl = detail?.sprites?.other.showdown.front_default;

  return (
    <View
      style={[
        styles.evolveContainer,
        name === currentState ? styles.currentState : null,
      ]}>
      <View style={styles.base}>
        <FastImage
          style={styles.artwork}
          source={{
            uri: imageUrl,
            priority: FastImage.priority.high,
          }}
          defaultSource={require('@assets/images/default_image_loading.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <TextView align="center" color={theme.colors.neutral500} fz={10}>
        {name}
      </TextView>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artwork: {
    width: 64,
    height: 64,
  },
  evolveContainer: {
    flexDirection: 'column',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  currentState: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
  },
});
