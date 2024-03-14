import theme from '@/theme';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {
    height: '35%',
    width: '100%',
    position: 'absolute',
    bottom: -8,
  },
  bottomNavigation: {
    position: 'absolute',
    backgroundColor: theme.colors.white,
    bottom: 0,
    width: '100%',
    height: Platform.OS === 'ios' ? 80 : 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopColor: theme.colors.primary,
    borderTopWidth: 4,
  },
  navigation: {
    alignItems: 'center',
    flex: 1,
  },
  sideNavigation: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 8,
    top: -156,
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 16,
  },
  sideTouchNav: {
    alignItems: 'center',
  },
  sideIcon: {
    width: 48,
    height: 48,
  },
  icon: {
    width: 24,
    height: 24,
  },
  content: {
    height: Platform.OS === 'ios' ? '80%' : '85%',
    padding: 16,
    marginTop: -16,
    width: '100%',
  },
  profile: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fragmentContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    height: 200,
    paddingHorizontal: 16,
  },
});
