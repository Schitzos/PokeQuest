import {queryResponseProps} from '@/utils/types';

export interface PokemonItem {
  name: string;
}

export interface PokemonSpeciesResponse extends queryResponseProps {
  data: {
    id: number;
  };
}

export interface PokemonDetailResponse extends queryResponseProps {
  data: {
    sprites: {
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
  };
}
