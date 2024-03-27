/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, TouchableOpacity, View} from 'react-native';
import {
  getListPokemon,
  searchPokemon,
} from '@/services/pokemon/pokemon.service';
import {ListPokemonProps} from './type';
import PokemonImage from '../PokemonImage';
import {ShakeUpDown} from '@/utils/animation';
import ListPokemonSkeleton from '../ListPokemonSkeleton';
import SplashScreen from 'react-native-splash-screen';
import TextView from '@/components/TextView';
import LoadingList from '../LoadingList';
import {styles} from './styles';
import {PokemonItem, PokemonListPage} from '@/types/ListPokemon';
import ScreenPerformanceTrace from '@/utils/performance/screenPerformanceTrace';

export default function ListPokemon({
  navigation,
  search,
  scrollY,
  handleScroll,
  soundRef,
}: Readonly<ListPokemonProps>) {
  const isFirstRender = useRef(true);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const limit = 100;
  const windowHeight = Dimensions.get('window').height;
  const translateY = scrollY.interpolate({
    inputRange: [0, 750],
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
    return page?.results || [];
  });

  const pokeSearch = (pokemonSearch.data as PokemonItem) || {};

  const handleLoadMore = () => {
    if (!pokemonLists.isFetching) {
      pokemonLists.fetchNextPage();
    }
  };

  useEffect(() => {
    const trace = ScreenPerformanceTrace('load_home_screen');
    if (!isFirstRender.current) {
      search && pokemonSearch.refetch();
    }

    if (!isFirstRender.current && !pokemonLists.isLoading) {
      SplashScreen.hide();
      trace.stop();
    } else {
      trace.start();
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
          transform: [{translateY: translateY}],
          height: windowHeight,
        },
      ]}>
      <TouchableOpacity
        onPress={() =>
          soundRef?.current?.isPlaying()
            ? soundRef?.current?.pause()
            : soundRef?.current?.play()
        }
        style={styles.pokeballCont}>
        <Animated.Image
          style={[styles.pokeball, {transform: [{translateY: shakeAnimation}]}]}
          source={require('@assets/images/pokeball.png')}
        />
      </TouchableOpacity>
      {(pokemonLists.isLoading || pokemonSearch.isFetching) && (
        <ListPokemonSkeleton />
      )}
      <View
        style={[
          styles.single,
          search && !pokemonSearch.isSuccess ? styles.visible : styles.hidden,
        ]}>
        <TextView align="center">No Pokèmon found</TextView>
      </View>
      {Boolean(
        search && !pokemonSearch.isFetching && pokemonSearch.isSuccess,
      ) && (
        <View
          style={[
            styles.single,
            search && !pokemonSearch.isFetching && pokemonSearch.isSuccess
              ? styles.visible
              : styles.hidden,
          ]}>
          <PokemonImage
            name={pokeSearch.name}
            navigation={navigation}
            id={pokeSearch.id}
            isSearch={Boolean(search)}
          />
        </View>
      )}
      <Animated.FlatList
        style={
          !search && !pokemonLists.isLoading ? styles.visible : styles.hidden
        }
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
        onEndReached={() => handleLoadMore()}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        initialNumToRender={limit}
        contentContainerStyle={styles.cusFlatList}
        ListFooterComponent={() => (
          <LoadingList
            text="Loading..."
            isLoading={pokemonLists.isFetchingNextPage}
          />
        )}
      />
      {pokemonLists.isFetchingNextPage && <TextView>Loading</TextView>}
    </Animated.View>
  );
}
