import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flex: 1,
    gap: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artwork: {
    width: 300,
    height: 300,
    zIndex: 1000,
  },
  typesContainer: {
    gap: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  types: {
    flexDirection: 'row',
    gap: 8,
  },
  type: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  perStat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressParent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '60%',
  },
});
