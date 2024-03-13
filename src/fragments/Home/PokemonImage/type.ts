import {RootStackParamList} from '@/navigation/types';
import {queryResponseProps} from '@/utils/types';
import {StackNavigationProp} from '@react-navigation/stack';

export interface PokemonImageProps {
  name: string;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  id: number;
  isSearch: boolean;
}

export interface PokemonSpeciesDataResponse extends queryResponseProps {
  id: number;
  color: {
    name: string;
  };
  evolution_chain: {
    url: string;
  };
}

export interface PokemonDetailDataResponse extends queryResponseProps {
  id: number;
  weight: number;
  name: string;
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
