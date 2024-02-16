import theme from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  base: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  baseBorder: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  childBase: {
    flex: 1,
    gap: 8,
  },
  childWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  artwork: {
    width: 64,
    height: 64,
  },
  evolveContainer: {
    flexDirection: 'column',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  currentState: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
  },
});
