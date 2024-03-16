import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  hungryContainer: {
    position: 'absolute',
    width: 150,
    height: 120,
    top: -64,
    right: 0,
    display: 'flex',
  },
  hungry: {
    width: 150,
    height: 120,
    top: 0,
    right: 0,
    display: 'flex',
  },
  hungryText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    marginTop: -16,
    paddingHorizontal: 8,
  },
});
