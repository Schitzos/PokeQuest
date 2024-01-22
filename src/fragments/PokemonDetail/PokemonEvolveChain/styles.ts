import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
  evolveContainer: {
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  meassurmentItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 16,
  },
  meassurmentInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
