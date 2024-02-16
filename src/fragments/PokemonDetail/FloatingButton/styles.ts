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
    borderTopWidth: 2,
    justifyContent: 'center',
    zIndex: 1000,
  },
  pokeball: {
    width: 72,
    height: 72,
    alignSelf: 'center',
    position: 'absolute',
    top: 16,
    borderColor: 'red',
    zIndex: 3000,
  },
  ballContainer: {
    borderWidth: 2,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    position: 'absolute',
    width: 96,
    height: 64,
    top: -64,
    borderBottomWidth: 0,
    borderColor: theme.colors.neutral100,
    backgroundColor: theme.colors.white,
    zIndex: 1000,
  },
});
