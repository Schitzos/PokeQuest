import {RootStackParamList} from '@/navigation/types';
import {queryResponseProps} from '@/utils/types';
import {StackNavigationProp} from '@react-navigation/stack';

export interface PokemonItem {
  name: string;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export interface PokemonSpeciesDataResponse extends queryResponseProps {
  id: number;
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
    };
  };
}
