import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, Platform} from 'react-native';
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

export default function Dashboard({navigation}: DashboardScreenProps) {
  const {pokemon, removePokemon, setPokemon} = usePokemon();
  const handleRemovePokemon = () => {
    removePokemon();
    navigation.navigate('Home');
  };

  const handleEvolve = async () => {
    const pokemonEvolveTo = await handlePokemonEvolution().then((res: any) => {
      const payload = {
        pokemonId: res.detail.id,
        pokemonName: res.detail.name,
        currentExp: Math.round(pokemon.selected.currentExp),
        prevExp: pokemon.selected.prevExp,
        nextExpEvolve: Math.round(res.detail.weight * 0.1),
        hungerPoints: 0,
        isActive: true,
        evolveChain: pokemon.selected.evolveChain,
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
    });

    await handlePokemonNextEvolution(pokemonEvolveTo).then((res: any) => {
      pokemonEvolveTo.selected.nextExpEvolve = res.weight * 0.1;
      setPokemon(pokemonEvolveTo);
    });
  };

  const handlePokemonEvolution = async () => {
    try {
      const currentStatePokemon = findPokemonEvolveById(
        pokemon.selected.evolveChain,
        pokemon.selected.pokemonId,
      );
      if (currentStatePokemon?.evolveTo) {
        const detail = await getNextEvolveDetail(
          currentStatePokemon.evolveTo[0].species_id,
        );
        const species = await getNextEvolveSpecies(
          currentStatePokemon.evolveTo[0].species_id,
        );
        return {detail, species};
      }
    } catch (error) {
      console.log('error handlePokemonEvolution');
      return error;
    }
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

  useEffect(() => {
    if (pokemon) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.base}>
      <FastImage
        source={require('@assets/images/background-dashboard.png')}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}>
        <SafeAreaView />
        <PokemonArt handleEvolve={handleEvolve} />
        <MenuNavigationContent handleRemovePokemon={handleRemovePokemon} />
      </FastImage>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  contentDashboard: {
    height: '35%',
    padding: 16,
    marginTop: -16,
    width: '100%',
  },
  contentFeed: {
    height: '30%',
    padding: 16,
    marginTop: -16,
    width: '100%',
  },
  content: {
    height: '30%',
    padding: 16,
    marginTop: -16,
    width: '100%',
  },
  backgroundImage: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  artContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%',
  },
  btnFeedContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 0 : 24,
    width: 96,
  },
  art: {
    width: 300,
    height: 300,
  },
  hungry: {
    position: 'absolute',
    width: 120,
    height: 90,
    top: 0,
    right: 100,
    display: 'flex',
  },
  hungryText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 32,
  },
  statFrame: {
    flex: 1,
  },
});
