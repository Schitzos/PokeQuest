import theme from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
    paddingTop: 48,
    gap: 16,
    marginBottom: 500,
  },
  pokeball: {
    width: 72,
    height: 72,
    alignSelf: 'center',
    position: 'absolute',
    top: -32,
    zIndex: 1000,
  },
  pages: {
    flex: 1,
    gap: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoContainer: {
    backgroundColor: theme.colors.primary,
    gap: 16,
    padding: 16,
    paddingBottom: 38,
    flex: 1,
  },
  mainLogo: {
    width: 256,
    height: 256,
    alignSelf: 'center',
    zIndex: 1000,
  },
  single: {
    flex: 1,
  },
  cusFlatList: {
    paddingBottom: 256,
  },
});
