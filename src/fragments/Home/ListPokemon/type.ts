import {RootStackParamList} from '@/navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {MutableRefObject} from 'react';
import {Animated} from 'react-native';
import Sound from 'react-native-sound';

export interface ListPokemonProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  search: string;
  scrollY: Animated.Value;
  handleScroll: any;
  soundRef: MutableRefObject<Sound | null>;
}
