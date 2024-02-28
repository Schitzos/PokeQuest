import {
  PokemonDetailDataResponse,
  PokemonSpeciesDataResponse,
} from '@/fragments/Home/PokemonImage/type';
import {
  PokemonDatas,
  findPokemonEvolveById,
  getNextEvolveDetail,
  parseEvolutionChainRecursive,
} from '@/utils/common/evolution';
import {transformStatsArray, transformTypesArray} from '@/utils/common/stat';
import {PokemonEvolveDataResponse} from './type';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigation/types';

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
  detail: PokemonDetailDataResponse;
  species: PokemonSpeciesDataResponse;
  parsedEvolve: PokemonDatas;
  id: number;
  evolve: PokemonEvolveDataResponse;
  setPokemon: (data: any) => void;
  navigation: StackNavigationProp<RootStackParamList, 'PokemonDetail'>;
}) => {
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
  detail: PokemonDetailDataResponse;
  parsedEvolve: PokemonDatas;
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
