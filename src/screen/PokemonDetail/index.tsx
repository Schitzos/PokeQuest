/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, useWindowDimensions, Text, Animated} from 'react-native';
import HeaderScreen from '@components/HeaderScreen';
import {styles} from './styles';
import {CustomRoute, PokemonDetailScreenProps} from './type';
import {pokemonType} from '@/constants/pokemonType';
import {SceneMap, TabBar, TabBarProps, TabView} from 'react-native-tab-view';
import PokemonArt from '@/fragments/PokemonDetail/PokemonArt';
import PokemonAbout from '@/fragments/PokemonDetail/PokemonAbout';
import PokemonStat from '@/fragments/PokemonDetail/PokemonStat';
import FloatingButton from '@/fragments/PokemonDetail/FloatingButton';
import PokemonEvolveChain from '@/fragments/PokemonDetail/PokemonEvolveChain';
import {
  getDetailPokemon,
  getEvolveChain,
  getSpeciesPokemon,
} from '@/services/pokemon/pokemon.service';
import PokemonDetailLoading from '@/fragments/PokemonDetail/PokemonDetailLoading';
import {usePokemon} from '@/hooks/usePokemon';
import {parseEvolutionChainRecursive} from '@/utils/common/evolution';
import {handleChoosePokemon} from './function';
import PokemonDetailError from '@/fragments/PokemonDetail/PokemonDetailError';
import {PokemonSpeciesResponse} from '@/types/SpeciesPokemon';
import {PokemonDetailResponse} from '@/types/DetailPokemon';
import {
  EvolutionChainResponse,
  PokemonEvolveData,
} from '@/types/EvolutionPokemon';
import ScreenPerformanceTrace from '@/config/fbPerformance/screenPerformanceTrace';

export default function PokemonDetail({
  route,
  navigation,
}: PokemonDetailScreenProps) {
  const {id, tab} = route.params;
  const {setPokemon} = usePokemon();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(tab || 0);
  const [routes] = React.useState([
    {key: 'about', title: 'About'},
    {key: 'stats', title: 'Stats'},
    {key: 'evolutions', title: 'Evolutions'},
  ]);
  const [spark, setSpark] = useState(false);

  const pokemonSpecies = getSpeciesPokemon({
    id: id,
    key: ['getSpeciesPokemon', id],
  });
  const species = (pokemonSpecies?.data || {}) as PokemonSpeciesResponse;

  const pokemonDetail = getDetailPokemon({
    id: id,
    key: ['getDetailPokemon', id],
  });
  const detail = (pokemonDetail?.data || {}) as PokemonDetailResponse;

  const pokemonEvolveChain = getEvolveChain({
    id: species?.evolution_chain?.url?.split('/')?.reverse()[1],
    key: ['getEvolveChain', id],
  });
  const evolve = (pokemonEvolveChain?.data || []) as EvolutionChainResponse;
  const parsedEvolve = parseEvolutionChainRecursive(
    evolve?.chain || [],
  ) as PokemonEvolveData;

  const renderScene = SceneMap({
    about: () => (
      <PokemonAbout pokemonSpecies={species} pokemonDetail={detail} />
    ),
    stats: () => <PokemonStat pokemonDetail={detail} />,
    evolutions: () => (
      <PokemonEvolveChain
        pokemonEvolve={parsedEvolve}
        currentState={detail.name}
      />
    ),
  });

  const baseColor =
    !pokemonDetail.isFetching && pokemonDetail.isSuccess
      ? pokemonType?.find(val => val.name === detail?.types[0]?.type?.name)
          ?.baseColor
      : pokemonType[0].baseColor;

  const renderTabBar = (props: TabBarProps<CustomRoute>) => (
    <TabBar
      {...props}
      pressColor={baseColor}
      scrollEnabled={false}
      indicatorStyle={{
        ...styles.tabBarIndicator,
        backgroundColor: baseColor,
      }}
      style={styles.tabBar}
      // eslint-disable-next-line @typescript-eslint/no-shadow
      renderLabel={({route, focused}) => (
        <Text style={focused ? styles.tabBarTextFocus : styles.tabBarText}>
          {route.title}
        </Text>
      )}
    />
  );

  useEffect(() => {
    setIndex(0);
  }, [id]);

  useEffect(() => {
    setSpark(false);
  }, []);

  useEffect(() => {
    const trace = ScreenPerformanceTrace('load_detail_screen');
    trace.start();
    if (
      !pokemonSpecies.isFetching &&
      !pokemonDetail.isFetching &&
      !pokemonEvolveChain.isFetching
    ) {
      trace.stop();
    }
  }, [
    pokemonSpecies.isFetching,
    pokemonDetail.isFetching,
    pokemonEvolveChain.isFetching,
  ]);

  if (pokemonDetail.isFetching) {
    return <PokemonDetailLoading />;
  }

  if (pokemonDetail.isError || pokemonSpecies.isError) {
    return <PokemonDetailError />;
  }

  return (
    <Animated.View style={styles.base}>
      <Animated.View style={styles.base}>
        <HeaderScreen align="center" label={detail.name} color={baseColor} />
        <PokemonArt
          pokemonDetail={detail}
          spark={spark}
          isLegendary={species.is_legendary}
        />
        <View style={styles.pokeStat}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            renderTabBar={renderTabBar}
          />
        </View>
        <Animated.View>
          <FloatingButton
            spark={spark}
            color={baseColor}
            handleChoosePokemon={() =>
              handleChoosePokemon({
                setSpark,
                detail,
                species,
                parsedEvolve,
                id,
                evolve,
                setPokemon,
                navigation,
              })
            }
          />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
