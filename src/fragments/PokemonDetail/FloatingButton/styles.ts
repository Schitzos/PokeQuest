import theme from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    borderTopColor: theme.colors.neutral100,
    borderTopWidth: 1,
  },
});
