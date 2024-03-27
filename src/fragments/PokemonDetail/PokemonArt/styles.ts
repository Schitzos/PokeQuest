import theme from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  artworkContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artwork: {
    width: 320,
    height: 320,
  },
  choosenImageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.black,
    position: 'absolute',
    zIndex: 1000,
  },
  choosenImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.black,
    position: 'absolute',
  },
  legendaryFrame: {
    width: 96,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    right: -8,
  },
  legendary: {
    width: 48,
    height: 48,
  },
  textLegendary: {
    color: theme.colors.white, // Text color set to white
    fontSize: 10, // Example font size, adjust as needed
    zIndex: 1000,
    fontFamily: theme.font.reguler,
    marginTop: -12,
  },
  frameId: {
    position: 'absolute',
    top: -44,
    right: 16,
    transform: [{rotate: '0deg'}],
  },
});
