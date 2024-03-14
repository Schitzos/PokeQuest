import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  pokemonInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    gap: 4,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  frameAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  frame: {
    justifyContent: 'center',
    height: 72,
    flex: 1,
    paddingHorizontal: 16,
  },
  textInfoContainer: {
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  miniArt: {
    width: 56,
    height: 56,
  },
  art: {
    width: 300,
    height: 300,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  readyEvolve: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1000,
  },
  artSpark: {
    width: 50,
    height: 50,
  },
});
