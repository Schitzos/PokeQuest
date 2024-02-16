import theme from '@/theme';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: Platform.OS === 'android' ? 6 : 12,
    paddingHorizontal: 16,
    borderColor: theme.colors.primary100,
    borderWidth: 2,
  },
  iconWrapper: {
    opacity: 0.5,
  },
  search: {
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    fontFamily: theme.font.reguler,
    fontSize: 12,
    flex: 1,
    paddingVertical: 0,
  },
});
