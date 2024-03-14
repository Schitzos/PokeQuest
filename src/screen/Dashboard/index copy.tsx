import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, Animated, BackHandler} from 'react-native';
import {DashboardScreenProps} from './type';
import {usePokemon} from '@/hooks/usePokemon';
import FastImage from 'react-native-fast-image';
import {
  findPokemonEvolveById,
  getNextEvolveDetail,
  getNextEvolveSpecies,
} from '@/utils/common/evolution';
import {transformStatsArray, transformTypesArray} from '@/utils/common/stat';
import SplashScreen from 'react-native-splash-screen';
import MenuNavigationContent from '@/fragments/Dashboard/MenuNavigationContent';
import PokemonArt from '@/fragments/Dashboard/PokemonArt';
import Evolution from '@/fragments/Dashboard/Evolution';
import EvolutionChainOption from '@/fragments/Dashboard/EvolutionChainOption';
import {useFocusEffect} from '@react-navigation/native';
import {handleBackPress} from './function';
import {PokemonEvolveData} from '@/types/EvolutionPokemon';
import {styles} from './styles';
import {handleRemovePokemon} from '../Home/function';
import {useAnimation} from '@/hooks/useAnimation';

export default function Dashboard({navigation, route}: DashboardScreenProps) {
  const {pokemon, removePokemon, setPokemon} = usePokemon();
  const {animateOpacityHidden, animateOpacityShow} = useAnimation();
  const viewBaseAnimate = useRef(new Animated.Value(1)).current;
  const viewEvolveAnimate = useRef(new Animated.Value(0)).current;
  const viewEvolveSpark = useRef(new Animated.Value(0)).current;
  const viewEvolveChain = useRef(new Animated.Value(0)).current;
  const doubleBackToExitPressedOnce = useRef(false);

  const [pokemonEvolveOption, setPokemonEvolveOption] = useState<
    PokemonEvolveData[] | undefined
  >([]);

  const handleEvolve = async () => {
    animateOpacityHidden(viewBaseAnimate);
    animateOpacityShow(viewEvolveAnimate);
    setTimeout(() => {
      animateOpacityShow(viewEvolveSpark);
    }, 1000);
    setTimeout(() => {
      handleEvolveTransform();
    }, 2000);
  };

  const handleEvolveTransform = async () => {
    const pokemonEvolveTo = await handlePokemonEvolution().then((res: any) => {
      if (res) {
        const payload = {
          pokemonId: res.detail.id,
          pokemonName: res.detail.name,
          currentExp: Math.round(pokemon?.selected.currentExp!),
          prevExp: pokemon?.selected.prevExp,
          nextExpEvolve: Math.round(res.detail.weight * 0.1),
          hungerPoints: 0,
          isActive: true,
          evolveChain: pokemon?.selected.evolveChain,
          stats: {
            ...transformStatsArray(res.detail.stats),
            height: res.detail.height * 10,
            weight: Math.round(res.detail.weight * 0.1),
          },
          type: transformTypesArray(res.detail.types),
          prevBerry: null,
        };
        const newEvolveData = {
          detail: res.detail,
          species: res.species,
          selected: payload,
        };
        return newEvolveData;
      } else {
        return null;
      }
    });

    if (pokemonEvolveTo) {
      await handlePokemonNextEvolution(pokemonEvolveTo).then((res: any) => {
        pokemonEvolveTo.selected.nextExpEvolve = res.weight * 0.1;
        setPokemon(pokemonEvolveTo);
        animateOpacityHidden(viewEvolveSpark);
        animateOpacityShow(viewEvolveAnimate);
        setTimeout(() => {
          animateOpacityHidden(viewEvolveAnimate);
          animateOpacityShow(viewBaseAnimate);
        }, 1000);
      });
    }
  };

  const handlePokemonEvolution = async () => {
    const currentStatePokemon = findPokemonEvolveById(
      pokemon?.selected.evolveChain!,
      pokemon?.selected.pokemonId!,
    );
    if (currentStatePokemon?.evolveTo?.length === 1) {
      try {
        const detail = await getNextEvolveDetail(
          currentStatePokemon.evolveTo[0].species_id,
        );
        const species = await getNextEvolveSpecies(
          currentStatePokemon.evolveTo[0].species_id,
        );
        return {detail, species};
      } catch (error) {
        console.log('error handlePokemonEvolution');
        return error;
      }
    } else {
      try {
        handleMultipleEvolution(currentStatePokemon?.evolveTo);
        animateOpacityHidden(viewEvolveAnimate);
        animateOpacityHidden(viewEvolveSpark);
        animateOpacityShow(viewEvolveChain);
        return null;
      } catch (error) {
        console.log('error handlePokemonMultipleEvolution');
      }
    }
  };

  const handleMultipleEvolution = async (evolveChain: any) => {
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
  };

  const handlePokemonNextEvolution = async (data: any) => {
    try {
      const currentStatePokemon = findPokemonEvolveById(
        data.selected.evolveChain,
        data.selected.pokemonId,
      );
      if (currentStatePokemon?.evolveTo) {
        return getNextEvolveDetail(currentStatePokemon.evolveTo[0].species_id);
      } else {
        return {weight: data.detail.weight};
      }
    } catch (error) {
      return error;
    }
  };

  const handleChooseEvolution = async ({id}: {id: number}) => {
    const currentStatePokemon = findPokemonEvolveById(
      pokemon?.selected.evolveChain!,
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
      currentExp: Math.round(pokemon?.selected.currentExp!),
      prevExp: pokemon?.selected.prevExp,
      nextExpEvolve: currentStatePokemon?.evolveTo
        ? Math.round(nextEvolve.weight * 0.1)
        : Math.round(detail.weight * 0.1),
      hungerPoints: 0,
      isActive: true,
      evolveChain: pokemon?.selected.evolveChain,
      stats: {
        ...transformStatsArray(detail.stats),
        height: detail.height * 10,
        weight: Math.round(detail.weight * 0.1),
      },
      type: transformTypesArray(detail.types),
      prevBerry: pokemon?.selected.prevBerry,
    };

    const newEvolveData = {
      detail: detail,
      species: species,
      selected: payload,
    };

    setPokemonEvolveOption([]);
    setPokemon(newEvolveData);
    animateOpacityShow(viewEvolveSpark);
    animateOpacityShow(viewEvolveAnimate);
    animateOpacityHidden(viewEvolveChain);
    setTimeout(() => {
      animateOpacityHidden(viewEvolveAnimate);
      animateOpacityHidden(viewEvolveSpark);
      animateOpacityShow(viewBaseAnimate);
    }, 1000);
  };

  useEffect(() => {
    if (pokemon) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
    FastImage.clearDiskCache();
    FastImage.clearMemoryCache();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHardwareBackPress = useCallback(() => {
    return handleBackPress({
      routeName: route.name,
      doubleBackToExitPressedOnce,
    }); // Pass route.name and doubleBackToExitPressedOnce
  }, [route.name, doubleBackToExitPressedOnce]);

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleHardwareBackPress(),
    );
    return () => backHandler.remove();
  });

  return (
    <View style={styles.base}>
      <Animated.View style={[styles.container, {opacity: viewBaseAnimate}]}>
        <FastImage
          source={require('@assets/images/background-dashboard.png')}
          style={styles.backgroundImage}
          resizeMode={FastImage.resizeMode.cover}>
          <SafeAreaView />
          <PokemonArt handleEvolve={handleEvolve} />
          <MenuNavigationContent
            handleRemovePokemon={() =>
              handleRemovePokemon(removePokemon, navigation)
            }
          />
        </FastImage>
      </Animated.View>
      <Evolution
        viewEvolveAnimate={viewEvolveAnimate}
        viewEvolveSpark={viewEvolveSpark}
      />
      {pokemonEvolveOption?.length !== 0 && (
        <EvolutionChainOption
          viewEvolveChain={viewEvolveChain}
          pokemonEvolveOption={pokemonEvolveOption}
          handleChooseEvolution={e => handleChooseEvolution(e)}
        />
      )}
    </View>
  );
}
