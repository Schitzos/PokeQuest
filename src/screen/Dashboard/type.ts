import {RootStackParamList} from '@/navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

export type DashboardScreenProps = {
  route: any;
  navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
};
