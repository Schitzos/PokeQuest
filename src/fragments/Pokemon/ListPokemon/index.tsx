import React, {useEffect, useRef, useCallback} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import TextView from '@/components/TextView';
import {getListPokemon} from '@/services/pokemon/pokemon.service';
import {ListPokemonProps} from './type';
import PokemonImage from '../PokemonImage';
import theme from '@/theme';

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
                <TouchableOpacity
                  style={styles.each}
                  key={pokemon.name}
                  onPress={() => navigation.navigate('PokemonDetail')}>
                  <PokemonImage name={pokemon.name} />
                  <TextView align="center">{pokemon.name}</TextView>
                </TouchableOpacity>
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
  each: {
    backgroundColor: theme.colors.neutral50,
    borderColor: theme.colors.neutral100,
    borderRadius: 8,
    padding: 8,
  },
});
