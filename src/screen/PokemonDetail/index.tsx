/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import HeaderScreen from '@components/HeaderScreen';
import {styles} from './styles';
import {PokemonDetailScreenProps, PokemonEvolveDataResponse} from './type';
import {pokemonType} from '@/constants/pokemonType';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import PokemonArt from '@/fragments/PokemonDetail/PokemonArt';
import PokemonAbout from '@/fragments/PokemonDetail/PokemonAbout';
import PokemonStat from '@/fragments/PokemonDetail/PokemonStat';
import FloatingButton from '@/fragments/PokemonDetail/FloatingButton';
import PokemonEvolveChain from '@/fragments/PokemonDetail/PokemonEvolveChain';
import {
  PokemonDetailDataResponse,
  PokemonSpeciesDataResponse,
} from '@/fragments/Home/PokemonImage/type';
import {
  getDetailPokemon,
  getEvolveChain,
  getSpeciesPokemon,
} from '@/services/pokemon/pokemon.service';
import PokemonDetailLoading from '@/fragments/PokemonDetail/PokemonDetailLoading';
import {usePokemon} from '@/hooks/usePokemon';
import {
  PokemonDatas,
  findPokemonEvolveById,
  getNextEvolveDetail,
  parseEvolutionChainRecursive,
} from '@/utils/common/evolution';
import {transformStatsArray, transformTypesArray} from '@/utils/common/stat';

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

  const pokemonSpecies = getSpeciesPokemon({
    id: id,
    key: ['getSpeciesPokemon', id],
  });
  const species = (pokemonSpecies?.data || {}) as PokemonSpeciesDataResponse;

  const pokemonDetail = getDetailPokemon({
    id: id,
    key: ['getDetailPokemon', id],
  });
  const detail = (pokemonDetail?.data || {}) as PokemonDetailDataResponse;

  const pokemonEvolveChain = getEvolveChain({
    id: species?.evolution_chain?.url?.split('/')?.reverse()[1],
    key: ['getEvolveChain', id],
  });
  const evolve = (pokemonEvolveChain?.data || []) as PokemonEvolveDataResponse;
  const parsedEvolve = parseEvolutionChainRecursive(
    evolve?.chain || [],
  ) as PokemonDatas;

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

  const baseColor = !pokemonDetail.isFetching
    ? pokemonType.find(val => val.name === detail?.types[0]?.type?.name)
        ?.baseColor
    : '';

  const handleChoosePokemon = async () => {
    await handlePokemonHadEvolution().then((res: any) => {
      const payload = {
        pokemonId: detail.id,
        pokemonName: detail.name,
        currentExp: Math.round(detail.weight * 0.1),
        nextExpEvolve: Math.round(res.weight * 0.1),
        hungerPoints: 0,
        isActive: true,
        evolveChain: parseEvolutionChainRecursive(evolve?.chain || []),
        stats: {
          ...transformStatsArray(detail.stats),
          height: detail.height * 10,
          weight: Math.round(detail.weight * 0.1),
        },
        type: transformTypesArray(detail.types),
        prevBerry: null,
      };
      const toLocalStorage = {detail, species, selected: payload};
      setPokemon(toLocalStorage);
      navigation.navigate('PetNavigator');
    });
  };

  const handlePokemonHadEvolution = async () => {
    try {
      const currentStatePokemon = findPokemonEvolveById(parsedEvolve, id);
      if (currentStatePokemon?.evolveTo) {
        return getNextEvolveDetail(currentStatePokemon.evolveTo[0].species_id);
      } else {
        return {weight: detail.weight};
      }
    } catch (error) {
      return error;
    }
  };

  const renderTabBar = (props: any) => (
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

  if (pokemonDetail.isFetching) {
    return <PokemonDetailLoading />;
  }

  return (
    <View style={styles.base}>
      <HeaderScreen align="center" label={detail.name} color={baseColor} />
      <PokemonArt pokemonDetail={detail} />
      <View style={styles.pokeStat}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
      <FloatingButton color={baseColor} onPress={handleChoosePokemon} />
    </View>
  );
}
