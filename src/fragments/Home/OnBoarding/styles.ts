import theme from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  safeArea: {
    backgroundColor: theme.colors.primary,
  },
  infoContainer: {
    backgroundColor: theme.colors.primary,
    gap: 16,
    padding: 16,
    paddingBottom: 48,
  },
  appLogo: {
    width: 256,
    height: 256,
    alignSelf: 'center',
  },
});
