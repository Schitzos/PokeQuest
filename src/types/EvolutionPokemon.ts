export type EvolutionDetail = {
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

export type EvolutionChainResponse = {
  chain: EvolutionChainData;
};

export type EvolutionChainData = {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainData[];
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
};

export type PokemonEvolveData = {
  species_name: string;
  species_id: number;
  species_weight?: number;
  evolveTo?: PokemonEvolveData[];
};
