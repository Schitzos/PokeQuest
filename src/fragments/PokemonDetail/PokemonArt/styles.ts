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
    zIndex: 2000,
  },
  choosenImageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.black,
    position: 'absolute',
  },
  choosenImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.black,
    position: 'absolute',
  },
});
