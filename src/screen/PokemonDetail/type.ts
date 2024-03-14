import {RootStackParamList} from '@/navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

export type PokemonDetailScreenProps = {
  route: any;
  navigation: StackNavigationProp<RootStackParamList, 'PokemonDetail'>;
};

export type CustomRoute = {
  key: string;
  title: string;
};
