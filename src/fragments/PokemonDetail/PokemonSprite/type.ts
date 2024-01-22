import {queryResponseProps} from '@/utils/types';

export interface PokemonSpriteProps {
  name: string;
  currentState: string;
}

export interface PokemonSpeciesDataResponse extends queryResponseProps {
  id: number;
  color: {
    name: string;
  };
}

export interface PokemonDetailDataResponse extends queryResponseProps {
  types: Array<{
    name: string;
  }>;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
      showdown: {
        front_default: string;
      };
    };
  };
}
