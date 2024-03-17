import {
  findPokemonEvolveById,
  getNextEvolveDetail,
  parseEvolutionChainRecursive,
} from '@/utils/common/evolution';
import {transformStatsArray, transformTypesArray} from '@/utils/common/stat';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigation/types';
import {QueryCache} from '@tanstack/react-query';
import FastImage from 'react-native-fast-image';
import {PokemonSpeciesResponse} from '@/types/SpeciesPokemon';
import {PokemonDetailResponse} from '@/types/DetailPokemon';
import {
  EvolutionChainResponse,
  PokemonEvolveData,
} from '@/types/EvolutionPokemon';
import analytics from '@react-native-firebase/analytics';

export const handleChoosePokemon = async ({
  setSpark,
  detail,
  species,
  parsedEvolve,
  id,
  evolve,
  setPokemon,
  navigation,
}: {
  setSpark: (data: boolean) => void;
  detail: PokemonDetailResponse;
  species: PokemonSpeciesResponse;
  parsedEvolve: PokemonEvolveData;
  id: number;
  evolve: EvolutionChainResponse;
  setPokemon: (data: any) => void;
  navigation: StackNavigationProp<RootStackParamList, 'PokemonDetail'>;
}) => {
  analytics().logEvent('select_pokemon', {
    pokemon_name: detail.name,
    pokemon_id: detail.id,
  });
  const queryCache = new QueryCache();
  setSpark(true);
  setTimeout(async () => {
    await handlePokemonHadEvolution({detail, parsedEvolve, id}).then(
      (res: any) => {
        const payload = {
          pokemonId: detail.id,
          pokemonName: detail.name,
          currentExp: Math.round(detail.weight * 0.1),
          prevExp: 0,
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

        queryCache.clear();
        // FastImage.clearDiskCache();
        FastImage.clearMemoryCache();
        navigation.navigate('Dashboard');
      },
    );
  }, 1000);
};

export const handlePokemonHadEvolution = async ({
  detail,
  parsedEvolve,
  id,
}: {
  detail: PokemonDetailResponse;
  parsedEvolve: PokemonEvolveData;
  id: number;
}) => {
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
