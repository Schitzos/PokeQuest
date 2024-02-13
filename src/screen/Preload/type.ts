import {RootStackParamList} from '@/navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

export type PreloadScreenProps = {
  route: any;
  navigation: StackNavigationProp<RootStackParamList, 'Preload'>;
};
