import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, Animated, BackHandler} from 'react-native';
import {DashboardScreenProps} from './type';
import {usePokemon} from '@/hooks/usePokemon';
import FastImage from 'react-native-fast-image';
import {findPokemonEvolveById} from '@/utils/common/evolution';
import SplashScreen from 'react-native-splash-screen';
import MenuNavigationContent from '@/fragments/Dashboard/MenuNavigationContent';
import PokemonArt from '@/fragments/Dashboard/PokemonArt';
import Evolution from '@/fragments/Dashboard/Evolution';
import EvolutionChainOption from '@/fragments/Dashboard/EvolutionChainOption';
import {useFocusEffect} from '@react-navigation/native';
import {
  handleBackPress,
  handleEvolve,
  handleMultipleEvolution,
  handleNormalEvolution,
  handleSelectEvolution,
} from './function';
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

  const handleEvolveTransform = async () => {
    let currentStatePokemon;
    if (pokemon) {
      currentStatePokemon = findPokemonEvolveById(
        pokemon.selected.evolveChain,
        pokemon.selected.pokemonId,
      );
    }

    if (currentStatePokemon?.evolveTo?.length === 1) {
      await handleNormalEvolution(currentStatePokemon, pokemon, setPokemon);
      animateOpacityHidden(viewEvolveSpark);
      animateOpacityShow(viewEvolveAnimate);
      setTimeout(() => {
        animateOpacityHidden(viewEvolveAnimate);
        animateOpacityShow(viewBaseAnimate);
      }, 1000);
    } else {
      await handleMultipleEvolution(
        currentStatePokemon?.evolveTo,
        setPokemonEvolveOption,
      );
      animateOpacityHidden(viewEvolveAnimate);
      animateOpacityHidden(viewEvolveSpark);
      animateOpacityShow(viewEvolveChain);
    }
  };

  const handleChooseEvolution = async (id: number) => {
    await handleSelectEvolution(
      id,
      pokemon,
      setPokemon,
      setPokemonEvolveOption,
    );
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
    });
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
          <PokemonArt
            handleEvolve={() =>
              handleEvolve(
                animateOpacityHidden,
                animateOpacityShow,
                viewBaseAnimate,
                viewEvolveAnimate,
                viewEvolveSpark,
                handleEvolveTransform,
              )
            }
          />
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
