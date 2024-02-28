/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import {
  getListPokemon,
  searchPokemon,
} from '@/services/pokemon/pokemon.service';
import {ListPokemonProps, PokemonItem, PokemonListPage} from './type';
import PokemonImage from '../PokemonImage';
import {ShakeUpDown} from '@/utils/animation';
import ListPokemonSkeleton from '../ListPokemonSkeleton';
import SplashScreen from 'react-native-splash-screen';
import TextView from '@/components/TextView';
import LoadingList from '../LoadingList';
import {styles} from './styles';

export default function ListPokemon({
  navigation,
  search,
  scrollY,
  handleScroll,
  searchTranslateY,
}: ListPokemonProps) {
  const isFirstRender = useRef(true);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const limit = 96;
  const windowHeight = Dimensions.get('window').height;
  const translateY = scrollY.interpolate({
    inputRange: [0, 750], // Adjust the range as needed
    outputRange: [0, -260],
    extrapolate: 'clamp',
  });

  const pokemonLists = getListPokemon({
    limit: limit,
    key: ['getListPokemon'],
    offset: 0,
  });

  const pokemonSearch = searchPokemon({
    key: ['searchPokemon'],
    search: search,
  });

  const pokemons = (pokemonLists?.data?.pages as PokemonListPage[]) || [];
  const flattenData = pokemons.flatMap(page => {
    return (page?.results || []) as PokemonItem[];
  });

  const pokeSearch = (pokemonSearch.data as PokemonItem) || {};

  const handleLoadMore = () => {
    if (!pokemonLists.isFetching) {
      pokemonLists.fetchNextPage();
    }
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      search && pokemonSearch.refetch();
    }

    if (!isFirstRender.current && !pokemonLists.isLoading) {
      SplashScreen.hide();
    } else {
      isFirstRender.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pokemonLists.isLoading]);

  useEffect(() => {
    ShakeUpDown(shakeAnimation, 500);
    const intervalId = setInterval(() => {
      ShakeUpDown(shakeAnimation, 500);
    }, 5000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        styles.base,
        {
          transform: [{translateY: Animated.add(translateY, searchTranslateY)}],
          height: windowHeight,
        },
      ]}>
      <Animated.Image
        style={[styles.pokeball, {transform: [{translateY: shakeAnimation}]}]}
        source={require('@assets/images/pokeball.png')}
      />
      {search && !pokemonSearch.isFetching && (
        <View style={styles.single}>
          <PokemonImage
            name={pokeSearch.name}
            navigation={navigation}
            id={pokeSearch.id}
            isSearch={Boolean(search)}
          />
        </View>
      )}
      {pokemonLists.isLoading && <ListPokemonSkeleton />}
      {!search && !pokemonLists.isLoading && (
        <Animated.FlatList
          data={flattenData}
          renderItem={({item, index}) => (
            <PokemonImage
              name={item.name}
              id={index + 1}
              navigation={navigation}
              key={item.name}
              isSearch={false}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          onEndReachedThreshold={0.8}
          numColumns={4}
          // estimatedItemSize={1000}
          // estimatedListSize={{height: windowHeight, width: windowWidth}}
          onEndReached={() => handleLoadMore()}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          initialNumToRender={limit}
          contentContainerStyle={styles.cusFlatList}
          ListFooterComponent={() =>
            pokemonLists.isFetchingNextPage && <LoadingList text="Loading..." />
          }
        />
      )}
      {pokemonLists.isFetchingNextPage && <TextView>Loading</TextView>}
    </Animated.View>
  );
}
