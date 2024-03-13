export interface PokemonDetailResponse {
  id: number;
  weight: number;
  name: string;
  abilities: Array<Ability>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  height: number;
  types: Array<{
    slot: number;
    type: {
      name: string;
    };
  }>;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
}
