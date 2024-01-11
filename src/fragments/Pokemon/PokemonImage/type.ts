import {RootStackParamList} from '@/navigation/types';
import {queryResponseProps} from '@/utils/types';
import {StackNavigationProp} from '@react-navigation/stack';

export interface PokemonItem {
  name: string;
  navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
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
