import theme from '@/theme';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  contentDashboard: {
    height: '35%',
    padding: 16,
    marginTop: -16,
    width: '100%',
  },
  contentFeed: {
    height: '30%',
    padding: 16,
    marginTop: -16,
    width: '100%',
  },
  content: {
    height: '30%',
    padding: 16,
    marginTop: -16,
    width: '100%',
  },
  backgroundImage: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  artContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    top: '25%',
  },
  artWrapper: {
    zIndex: 0,
  },
  btnFeedContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 0 : 24,
    width: 96,
  },
  art: {
    width: 300,
    height: 300,
  },
  hungryContainer: {
    position: 'absolute',
    width: 120,
    height: 90,
    top: -32,
    right: 0,
    display: 'flex',
  },
  hungry: {
    position: 'absolute',
    width: 150,
    height: 120,
    top: 0,
    right: 100,
    display: 'flex',
  },
  hungryText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 32,
  },
  statFrame: {
    flex: 1,
  },
  btnEvolveContainer: {
    zIndex: 3000,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 4 : -20,
  },
  btnEvolve: {
    borderColor: theme.colors.black50,
    width: 150,
    height: 48,
    paddingTop: 10,
  },
  artSpark: {
    position: 'absolute',
    top: -8,
    left: -16,
    width: 150,
    height: 48,
  },
});
