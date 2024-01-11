import {queryResponseProps} from '@/utils/types';

export interface PokemonItem {
  name: string;
}

export interface PokemonListsResponse extends queryResponseProps {
  data: {
    results?: PokemonItem[];
  };
}
