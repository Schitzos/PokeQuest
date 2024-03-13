import {RootStackParamList} from '@/navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

export type PokemonDetailScreenProps = {
  route: any;
  navigation: StackNavigationProp<RootStackParamList, 'PokemonDetail'>;
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {}

export type CustomRoute = {
  key: string;
  title: string;
};
