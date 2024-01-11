import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
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

export default function PokemonImage({name}: PokemonItem) {
  const pokemonSpecies: PokemonSpeciesResponse = getSpeciesPokemon({
    name: name,
    key: ['getListPokemon', name],
  }) as PokemonSpeciesResponse;

  const pokemon = pokemonSpecies?.data;

  const pokemonDetail: PokemonDetailResponse = getDetailPokemon({
    id: pokemon ? pokemon.id.toString() : '',
    key: ['getDetailPokemon', pokemon ? pokemon.id.toString() : ''],
  }) as PokemonDetailResponse;

  const detail = pokemonDetail?.data;

  if (pokemonSpecies.isLoading || pokemonDetail.isLoading) {
    return <TextView>Loading Image</TextView>;
  }

  return (
    <View>
      {detail && (
        <Image
          style={styles.artwork}
          source={{
            uri: detail?.sprites?.other['official-artwork'].front_default,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  artwork: {
    width: 100,
    height: 100,
  },
});
