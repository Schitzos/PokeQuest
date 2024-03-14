import {Alert, BackHandler} from 'react-native';
import {HandleBackPressParams} from '../Home/type';
import RNExitApp from 'react-native-exit-app';
import {Animated} from 'react-native';
import {transformStatsArray, transformTypesArray} from '@/utils/common/stat';
import {PokemonEvolveData} from '@/types/EvolutionPokemon';
import {
  findPokemonEvolveById,
  getNextEvolveDetail,
  getNextEvolveSpecies,
} from '@/utils/common/evolution';

export const handleBackPress = ({
  routeName,
  doubleBackToExitPressedOnce,
}: HandleBackPressParams) => {
  return () => {
    if (routeName === 'Dashboard' && doubleBackToExitPressedOnce.current) {
      Alert.alert('Exit PokèQuest', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => (doubleBackToExitPressedOnce.current = false),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            RNExitApp.exitApp();
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    }

    doubleBackToExitPressedOnce.current = true;
    setTimeout(() => {
      doubleBackToExitPressedOnce.current = false;
    }, 2000);

    return true;
  };
};

export const handleEvolve = async (
  animateOpacityHidden: (value: Animated.Value) => void,
  animateOpacityShow: (value: Animated.Value) => void,
  viewBaseAnimate: Animated.Value,
  viewEvolveAnimate: Animated.Value,
  viewEvolveSpark: Animated.Value,
  handleEvolveTransform: () => void,
) => {
  animateOpacityHidden(viewBaseAnimate);
  animateOpacityShow(viewEvolveAnimate);
  setTimeout(() => {
    animateOpacityShow(viewEvolveSpark);
  }, 1000);
  setTimeout(() => {
    handleEvolveTransform();
  }, 2000);
};

export const handleNormalEvolution = async (
  currentStatePokemon: PokemonEvolveData,
  pokemon: any,
  setPokemon: any,
) => {
  try {
    const speciesId = currentStatePokemon?.evolveTo?.[0]?.species_id;

    const detail = await getNextEvolveDetail(speciesId as number);
    const species = await getNextEvolveSpecies(speciesId as number);
    const payload = {
      pokemonId: detail.id,
      pokemonName: detail.name,
      currentExp: Math.round(pokemon.selected.currentExp),
      prevExp: pokemon.selected.prevExp,
      nextExpEvolve: Math.round(detail.weight * 0.1),
      hungerPoints: 0,
      isActive: true,
      evolveChain: pokemon.selected.evolveChain,
      stats: {
        ...transformStatsArray(detail.stats),
        height: detail.height * 10,
        weight: Math.round(detail.weight * 0.1),
      },
      type: transformTypesArray(detail.types),
      prevBerry: null,
    };
    const newEvolveData = {
      detail: detail,
      species: species,
      selected: payload,
    };
    await handlePokemonNextEvolution(newEvolveData, setPokemon);
  } catch (error) {
    console.log('error getting normal evolution');
    return null;
  }
};

const handlePokemonNextEvolution = async (data: any, setPokemon: any) => {
  try {
    const currentStatePokemon = findPokemonEvolveById(
      data.selected.evolveChain,
      data.selected.pokemonId,
    );
    if (currentStatePokemon?.evolveTo) {
      const resNextEvolvedetail = await getNextEvolveDetail(
        currentStatePokemon.evolveTo[0].species_id,
      );
      data.selected.nextExpEvolve = resNextEvolvedetail.weight * 0.1;
    }
    setPokemon(data);
  } catch (error) {
    return error;
  }
};

export const handleMultipleEvolution = async (
  evolveChain: any,
  setPokemonEvolveOption: any,
) => {
  const chainData = await Promise.all(
    evolveChain.map(async (chain: any) => {
      const res = await getNextEvolveDetail(chain.species_id);
      return {
        species_name: chain.species_name,
        species_id: chain.species_id,
        species_weight: (res.weight * 0.1).toFixed(),
      };
    }),
  );
  setPokemonEvolveOption(chainData);
  return null;
};

export const handleSelectEvolution = async (
  id: number,
  pokemon: any,
  setPokemon: (data: any) => void,
  setPokemonEvolveOption: (data: any) => void,
) => {
  const currentStatePokemon = findPokemonEvolveById(
    pokemon.selected.evolveChain,
    id,
  );

  let nextEvolve;
  if (currentStatePokemon?.evolveTo) {
    nextEvolve = await getNextEvolveDetail(
      currentStatePokemon.evolveTo[0].species_id,
    );
  }

  const detail = await getNextEvolveDetail(id);
  const species = await getNextEvolveSpecies(id);

  const payload = {
    pokemonId: detail.id,
    pokemonName: detail.name,
    currentExp: Math.round(pokemon.selected.currentExp),
    prevExp: pokemon.selected.prevExp,
    nextExpEvolve: currentStatePokemon?.evolveTo
      ? Math.round(nextEvolve.weight * 0.1)
      : Math.round(detail.weight * 0.1),
    hungerPoints: 0,
    isActive: true,
    evolveChain: pokemon.selected.evolveChain,
    stats: {
      ...transformStatsArray(detail.stats),
      height: detail.height * 10,
      weight: Math.round(detail.weight * 0.1),
    },
    type: transformTypesArray(detail.types),
    prevBerry: pokemon.selected.prevBerry,
  };

  const newEvolveData = {
    detail: detail,
    species: species,
    selected: payload,
  };

  setPokemonEvolveOption([]);
  setPokemon(newEvolveData);
};
