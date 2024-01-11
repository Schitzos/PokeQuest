import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import TextView from '@/components/TextView';
import {getListPokemon} from '@/services/pokemon/pokemon.service';
import {PokemonListsResponse} from './type';
import PokemonImage from '../PokemonImage';

export default function ListPokemon() {
  const pokemonLists: PokemonListsResponse = getListPokemon({
    limit: 100,
    key: ['getListPokemon'],
  }) as PokemonListsResponse;

  const pokemons = pokemonLists?.data?.results || [];

  if (pokemonLists.isLoading) {
    return <TextView>Loading</TextView>;
  }

  return (
    <View>
      {pokemons.map(pokemon => {
        return (
          <TouchableOpacity key={pokemon.name}>
            <PokemonImage name={pokemon.name} />
            <TextView>{pokemon.name}</TextView>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
