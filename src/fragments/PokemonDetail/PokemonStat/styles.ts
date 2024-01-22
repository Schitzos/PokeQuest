import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
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
  measurementContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  meassurmentItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 8,
  },
  meassurmentInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
