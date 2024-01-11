import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import TextView from '@/components/TextView';
import {
  getDetailPokemon,
  getSpeciesPokemon,
} from '@/services/pokemon/pokemon.service';
import {
  PokemonDetailResponse,
  PokemonItem,
  PokemonSpeciesResponse,
} from './type';
import theme from '@/theme';

export default function PokemonImage({name, navigation}: PokemonItem) {
  const pokemonSpecies: PokemonSpeciesResponse = getSpeciesPokemon({
    name: name,
    key: ['getListPokemon', name],
  }) as PokemonSpeciesResponse;

  const species = pokemonSpecies?.data;

  const pokemonDetail: PokemonDetailResponse = getDetailPokemon({
    id: species ? species.id.toString() : '',
    key: ['getDetailPokemon', species ? species.id.toString() : ''],
  }) as PokemonDetailResponse;

  const detail = pokemonDetail?.data;

  if (pokemonSpecies.isLoading || pokemonDetail.isLoading) {
    return <TextView>Loading Image</TextView>;
  }

  return (
    <TouchableOpacity
      style={styles.each}
      onPress={() =>
        navigation.navigate('PokemonDetail', {
          pokemonDetail: detail,
          pokemonSpecies: species,
        })
      }>
      {detail && (
        <Image
          style={styles.artwork}
          source={{
            uri: detail?.sprites?.other['official-artwork'].front_default,
          }}
        />
      )}
      <TextView align="center">{name}</TextView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  artwork: {
    width: 90,
    height: 90,
  },
  each: {
    backgroundColor: theme.colors.neutral50,
    borderColor: theme.colors.neutral100,
    borderRadius: 8,
    padding: 8,
  },
});
