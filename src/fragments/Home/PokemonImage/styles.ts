import theme from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flex: 1,
    padding: 4,
    position: 'relative',
  },
  baseLarge: {
    flex: 1,
    alignItems: 'center',
  },
  each: {
    backgroundColor: theme.colors.neutral50,
    borderColor: theme.colors.neutral200,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
  },
  eachLarge: {
    width: '45%',
    maxHeight: 256,
    borderWidth: 1,
    borderRadius: 16,
  },
  background: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    position: 'relative',
  },
  backgroundLarge: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  pokemonId: {
    color: theme.colors.neutral100,
    fontSize: 10,
    alignSelf: 'flex-start',
    position: 'absolute',
    right: 0,
    width: '100%',
    textAlign: 'right',
    paddingRight: 4,
    paddingTop: 4,
    fontFamily: theme.font.reguler,
  },
  pokemonIdLarge: {
    fontSize: 16,
  },
  artwork: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    position: 'absolute',
  },
  artworkLarge: {
    width: 225,
    height: 225,
    alignSelf: 'center',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLoading: {
    width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  pokeTypes: {
    width: 24,
    height: 24,
  },
  info: {
    width: '100%',
    padding: 4,
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral100,
    gap: 4,
    flex: 1,
  },
  infoLarge: {
    flex: 0,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.neutral200,
  },
  typeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    flexDirection: 'row',
    gap: 4,
  },
});
