import {RootStackParamList} from '@/navigation/types';
import {queryResponseProps} from '@/utils/types';
import {StackNavigationProp} from '@react-navigation/stack';

export interface PokemonItem {
  name: string;
  id: number;
}

export interface PokemonListsResponse extends queryResponseProps {
  data: {
    results?: PokemonItem[];
  };
}

export interface ListPokemonProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  loadMore: boolean;
  search: string;
}
