import {
  getDetailPokemonAlt,
  getSpeciesPokemonAlt,
} from '@/services/pokemon/pokemon.service';

type EvolutionDetail = {
  gender: null | string;
  held_item: null | string;
  item: null | string;
  known_move: null | string;
  known_move_type: null | string;
  location: null | string;
  min_affection: null | string;
  min_beauty: null | string;
  min_happiness: null | string;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: null | string;
  party_type: null | string;
  relative_physical_stats: null | string;
  time_of_day: string;
  trade_species: null | string;
  trigger: {
    name: string;
    url: string;
  };
  turn_upside_down: boolean;
};

type EvolutionChainData = {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainData[];
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
};

export type PokemonDatas = {
  species_name: string;
  species_id: number;
  evolveTo?: PokemonDatas[];
};

export function parseEvolutionChainRecursive(
  evolutionChain: EvolutionChainData,
): PokemonDatas {
  const species_name = evolutionChain?.species?.name;
  const species_id = parseInt(
    evolutionChain?.species?.url?.split('/').reverse()[1],
    10,
  );

  const evolveTo: PokemonDatas[] = evolutionChain?.evolves_to?.map(
    parseEvolutionChainRecursive,
  );

  return {
    species_name,
    species_id,
    evolveTo: evolveTo?.length > 0 ? evolveTo : undefined,
  };
}

export const findPokemonEvolveById = (
  evolves: PokemonDatas,
  pokemonId: number,
): PokemonDatas | null => {
  if (evolves.species_id === pokemonId) {
    return evolves;
  }

  if (evolves.evolveTo) {
    for (const evol of evolves.evolveTo) {
      const result = findPokemonEvolveById(evol, pokemonId);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

export const getNextEvolveDetail = async (species_id: number) => {
  return getDetailPokemonAlt({
    id: species_id,
  })
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => {
      console.log('error get species', error);
    });
};

export const getNextEvolveSpecies = async (species_id: number) => {
  return getSpeciesPokemonAlt({
    id: species_id,
  })
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => {
      console.log('error get species', error);
    });
};
