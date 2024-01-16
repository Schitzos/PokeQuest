import React, {useEffect, useRef, useCallback} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {getListPokemon} from '@/services/pokemon/pokemon.service';
import {ListPokemonProps} from './type';
import PokemonImage from '../PokemonImage';
import theme from '@/theme';
import {ShakeUpDown} from '@/utils/animation/shake';
import ListPokemonSkeleton from '../ListPokemonSkeleton';

export default function ListPokemon({navigation, loadMore}: ListPokemonProps) {
  const isFirstRender = useRef(true);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const pokemonLists = getListPokemon({
    limit: 16,
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

  useEffect(() => {
    ShakeUpDown(shakeAnimation, 500);
    const intervalId = setInterval(() => {
      ShakeUpDown(shakeAnimation, 500);
    }, 5000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.base}>
      <Animated.Image
        style={[styles.pokeball, {transform: [{translateY: shakeAnimation}]}]}
        source={require('@assets/images/pokeball.png')}
      />
      {pokemonLists.isLoading && <ListPokemonSkeleton />}
      {!pokemonLists.isLoading &&
        pokemons?.map((page: any, idx) => {
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
    backgroundColor: theme.colors.white,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
    paddingTop: 48,
    gap: 16,
  },
  pokeball: {
    width: 72,
    height: 72,
    alignSelf: 'center',
    position: 'absolute',
    top: -32,
    zIndex: 1000,
  },
  pages: {
    flex: 1,
    gap: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});