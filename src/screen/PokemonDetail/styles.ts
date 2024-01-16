import theme from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  text: {
    color: 'red',
  },
  imageContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artwork: {
    width: 300,
    height: 300,
    zIndex: 1000,
  },
  pokeStat: {
    padding: 16,
    gap: 8,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1,
    marginTop: -16,
  },
  perStat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressParent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '60%',
  },
});
