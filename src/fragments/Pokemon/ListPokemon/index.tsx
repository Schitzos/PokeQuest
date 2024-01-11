import React, {useEffect, useRef, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {getListPokemon} from '@/services/pokemon/pokemon.service';
import {ListPokemonProps} from './type';
import PokemonImage from '../PokemonImage';

export default function ListPokemon({navigation, loadMore}: ListPokemonProps) {
  const isFirstRender = useRef(true);

  const pokemonLists = getListPokemon({
    limit: 21,
    key: ['getListPokemon'],
    offset: 0,
  });

  const pokemons = pokemonLists?.data?.pages || [];

  const handleLoadMore = useCallback(() => {
    if (loadMore && !pokemonLists.isFetching && !isFirstRender.current) {
      pokemonLists.fetchNextPage();
    }
  }, [loadMore, pokemonLists]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    handleLoadMore();
  }, [handleLoadMore]);

  return (
    <View style={styles.base}>
      {pokemons?.map((page: any, idx) => {
        return (
          <View key={idx} style={styles.pages}>
            {page.results.map((pokemon: any) => {
              return (
                <PokemonImage
                  name={pokemon.name}
                  navigation={navigation}
                  key={pokemon.name}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  pages: {
    flex: 1,
    gap: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
