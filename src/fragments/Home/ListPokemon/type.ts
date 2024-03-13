import {RootStackParamList} from '@/navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {MutableRefObject} from 'react';
import Sound from 'react-native-sound';

export interface ListPokemonProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  search: string;
  scrollY: any;
  handleScroll: any;
  searchTranslateY: any;
  soundRef: MutableRefObject<Sound | null>;
}
