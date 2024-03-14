import theme from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {
    width: '33%',
    alignItems: 'center',
    paddingVertical: 4,
  },
  selectedBase: {
    borderColor: theme.colors.primary600,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: theme.colors.neutral50,
  },
  berryArt: {
    width: 16,
    height: 16,
  },
});
