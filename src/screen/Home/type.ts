import {RootStackParamList} from '@/navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import Sound from 'react-native-sound';

export type DashboardScreenProps = {
  route: any;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export interface HandleBackPressParams {
  routeName: string;
  doubleBackToExitPressedOnce: React.MutableRefObject<boolean>;
}

export interface SoundRef {
  current: Sound | null;
}
