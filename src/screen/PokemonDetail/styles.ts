import theme from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  pokeStat: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1,
    marginTop: -16,
  },
  tabBarIndicator: {
    backgroundColor: theme.colors.neutral500,
    height: 1,
    borderRadius: 10,
    color: 'red',
  },
  tabBar: {
    backgroundColor: theme.colors.white,
    elevation: 0,
    borderBottomColor: theme.colors.neutral50,
    borderBottomWidth: 1,
  },
  tabBarText: {
    color: theme.colors.neutral400,
    fontFamily: theme.font.reguler,
    fontSize: 12,
  },
  tabBarTextFocus: {
    color: theme.colors.black,
    fontFamily: theme.font.reguler,
    fontSize: 12,
  },
  pokeball: {
    width: 72,
    height: 72,
    alignSelf: 'center',
    zIndex: 1000,
  },
  choosen: {
    flex: 1,
    padding: 16,
    marginTop: '40%',
  },
  choosenImage: {
    width: '100%',
    height: '100%',
  },
});
