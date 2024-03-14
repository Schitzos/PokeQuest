import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  expPoint: {
    zIndex: 4000,
    position: 'absolute',
    top: Platform.OS === 'ios' ? -410 : -450,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 16,
    left: 250,
  },
});
