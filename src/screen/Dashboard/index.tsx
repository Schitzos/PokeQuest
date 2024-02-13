import React from 'react';
import {View, StyleSheet, SafeAreaView, Platform} from 'react-native';
import {DashboardScreenProps} from './type';
import {usePokemon} from '@/hooks/usePokemon';
import FastImage from 'react-native-fast-image';
import ListBerry from '@/fragments/Dashboard/ListBerry';
import PokemonInfo from '@/fragments/Dashboard/PokemonInfo';
import Button from '@/components/Button';
import TextView from '@/components/TextView';
import PokemonStat from '@/fragments/PokemonDetail/PokemonStat';
import {berryFirmnessHeightScale} from '@/utils/berry/indext';
import {
  findPokemonEvolveById,
  getNextEvolveDetail,
  getNextEvolveSpecies,
} from '@/utils/common/evolution';
import {transformStatsArray, transformTypesArray} from '@/utils/common/stat';

export default function Dashboard({navigation, route}: DashboardScreenProps) {
  const {pokemon, removePokemon, setPokemon} = usePokemon();
  const {action} = route.params;

  const handleRemovePokemon = () => {
    removePokemon();
    navigation.navigate('Home');
  };

  const handleAction = (val: any) => {
    console.log(val);
    let heightCalculate;
    if (
      !pokemon.selected.prevBerry ||
      pokemon.selected.prevBerry !== val.berryFirmness
    ) {
      heightCalculate =
        pokemon.selected.currentExp +
        berryFirmnessHeightScale[val.berryFirmness];
    } else {
      heightCalculate =
        pokemon.selected.currentExp -
        berryFirmnessHeightScale[val.berryFirmness] * 2;
    }

    const temp = {
      detail: pokemon.detail,
      species: pokemon.species,
      evolve: pokemon.evolve,
      selected: {
        ...pokemon.selected,
        currentExp: heightCalculate <= 0 ? 0 : heightCalculate,
        prevBerry: val.berryFirmness,
      },
    };
    setPokemon(temp);
  };

  const handleEvolve = async () => {
    const pokemonEvolveTo = await handlePokemonEvolution().then((res: any) => {
      const payload = {
        pokemonId: res.detail.id,
        pokemonName: res.detail.name,
        currentExp: Math.round(pokemon.selected.currentExp),
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

  return (
    <View style={styles.base}>
      <FastImage
        source={require('@assets/images/skyview.jpg')}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}>
        <SafeAreaView />
        <View style={styles.container}>
          <PokemonInfo />
          <View style={styles.artContainer}>
            <FastImage
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.detail.id}.png`,
                priority: FastImage.priority.high,
              }}
              style={styles.art}
              defaultSource={require('@assets/images/default_image_loading.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <FastImage
              source={require('@assets/images/hungry-image.png')}
              style={styles.hungry}
              defaultSource={require('@assets/images/default_image_loading.png')}
              resizeMode={FastImage.resizeMode.contain}>
              <View style={styles.hungryText}>
                <TextView>I'am Hungry</TextView>
              </View>
            </FastImage>
            {pokemon?.selected?.currentExp >=
              pokemon?.selected?.nextExpEvolve && (
              <Button onPress={() => handleEvolve()}>Evolve !!!</Button>
            )}
          </View>
        </View>
        {action === 'dashboard' && (
          <FastImage
            source={require('@assets/images/stat-frame.png')}
            style={styles.contentDashboard}
            defaultSource={require('@assets/images/default_image_loading.png')}
            resizeMode={FastImage.resizeMode.stretch}>
            <PokemonStat pokemonDetail={pokemon.detail} labeled={true} />
          </FastImage>
        )}
        {action === 'feed' && (
          <FastImage
            source={require('@assets/images/stat-frame.png')}
            style={styles.contentFeed}
            defaultSource={require('@assets/images/default_image_loading.png')}
            resizeMode={FastImage.resizeMode.stretch}>
            <ListBerry handleAction={handleAction} />
          </FastImage>
        )}
        {action === 'remove' && (
          <FastImage
            source={require('@assets/images/stat-frame.png')}
            style={styles.contentFeed}
            defaultSource={require('@assets/images/default_image_loading.png')}
            resizeMode={FastImage.resizeMode.stretch}>
            <View style={styles.content}>
              <Button onPress={() => handleRemovePokemon()}>
                remove pokemon
              </Button>
            </View>
          </FastImage>
        )}
      </FastImage>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  contentDashboard: {
    height: '30%',
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
    right: 0,
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
