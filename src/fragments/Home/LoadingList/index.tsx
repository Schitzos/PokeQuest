import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import theme from '@/theme';
import TextView from '@/components/TextView';

const LoadingList = ({text = 'Loading...'}) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={theme.colors.neutral500} />
    <TextView align="center">{text}</TextView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
});

export default LoadingList;
