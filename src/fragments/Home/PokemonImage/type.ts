import {RootStackParamList} from '@/navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

export interface PokemonImageProps {
  name: string;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  id: number;
  isSearch: boolean;
}
