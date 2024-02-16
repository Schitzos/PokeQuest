import {RootStackParamList} from '@/navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

export interface PokemonItem {
  name: string;
  id: number;
}

export interface ListPokemonProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  search: string;
  scrollY: any;
  handleScroll: any;
  searchTranslateY: any;
}

export interface PokemonListPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
}

export interface PokemonListsResponse {
  data: {
    pages: PokemonListPage[];
  };
}
