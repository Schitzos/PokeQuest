import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    zIndex: 1000,
    width: '100%',
    position: 'absolute',
    left: 16,
  },
  labeled: {
    padding: 16,
  },
  berryContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
    position: 'absolute',
    top: 48,
    height: 120,
    width: '100%',
  },
  berryList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  berryDetail: {
    width: '45%',
    height: '130%',
    padding: 8,
    paddingTop: 24,
    gap: 72,
    alignItems: 'center',
    borderRadius: 16,
    marginTop: -16,
  },
  pagination: {
    flexDirection: 'row',
    padding: 4,
    gap: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customInfoStyles: {
    width: '40%',
  },
  berryArt: {
    width: 72,
    height: 72,
    zIndex: 1000,
    position: 'absolute',
    right: 52,
    top: 32,
  },
  customButton: {
    marginTop: 8,
  },
  loadingBerry: {
    gap: 4,
    width: '100%',
    paddingHorizontal: 16,
  },
  cusLoading: {
    width: 12,
    height: 12,
  },
  skeletonContainer: {
    gap: 16,
    width: '100%',
  },
  expPoint: {
    zIndex: 4000,
    position: 'absolute',
    top: -200,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 16,
    left: 250,
  },
});
