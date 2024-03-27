import {
  getDetailPokemonAlt,
  getSpeciesPokemonAlt,
} from '@/services/pokemon/pokemon.service';
import {EvolutionChainData, PokemonEvolveData} from '@/types/EvolutionPokemon';

export function parseEvolutionChainRecursive(
  evolutionChain: EvolutionChainData,
): PokemonEvolveData {
  const species_name = evolutionChain?.species?.name;
  const species_id = parseInt(
    evolutionChain?.species?.url?.split('/').reverse()[1],
    10,
  );

  const evolveTo: PokemonEvolveData[] = evolutionChain?.evolves_to?.map(
    parseEvolutionChainRecursive,
  );

  return {
    species_name,
    species_id,
    evolveTo: evolveTo?.length > 0 ? evolveTo : undefined,
  };
}

export const findPokemonEvolveById = (
  evolves: PokemonEvolveData,
  pokemonId: number,
): PokemonEvolveData | null => {
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

export function isLatestEvolve(
  evolveArray: PokemonEvolveData[],
  targetId: number,
): boolean {
  let latestEvolveId: number | null = null;
  function findLatestId(evolve: PokemonEvolveData) {
    if (
      (!evolve.evolveTo || evolve.evolveTo.length === 0) &&
      evolve.species_id === targetId
    ) {
      latestEvolveId = evolve.species_id;
    } else {
      evolve?.evolveTo?.forEach(findLatestId);
    }
  }

  evolveArray?.forEach(findLatestId);
  if (evolveArray) {
    return latestEvolveId === targetId;
  } else {
    return true;
  }
}
