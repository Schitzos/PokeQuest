interface EvolutionDetails {
  species: {
    name: string;
  };
  min_level: number;
  trigger: {
    name: string;
    url: string;
  } | null;
  item: {
    name: string;
    url: string;
  } | null;
  evolves_to: EvolutionDetails[];
}

interface EvolutionChain {
  chain: EvolutionDetails;
}

interface ParsedEvolutionDetails {
  species_name: string;
}

export function parseEvolutionChain(evolutionChain: EvolutionChain) {
  const result: ParsedEvolutionDetails[] = [];

  function parseEvolutionDetails(
    details: EvolutionDetails,
  ): ParsedEvolutionDetails {
    return {
      species_name: details.species.name,
    };
  }

  function traverseChain(chain: EvolutionDetails) {
    if (chain.species) {
      result.push(parseEvolutionDetails(chain));
    }

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      for (const evolution of chain.evolves_to) {
        traverseChain(evolution);
      }
    }
  }

  if ('chain' in evolutionChain) {
    traverseChain(evolutionChain.chain);
  }

  return result;
}
