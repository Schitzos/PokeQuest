import theme from '@/theme';
import React from 'react';
import {StyleSheet, SafeAreaView, ViewStyle} from 'react-native';

interface SafeAreaProps {
  children: React.ReactNode;
  color?: string;
}

export default function SafeArea({children, color}: SafeAreaProps) {
  const styles = StyleSheet.create({
    base: {
      backgroundColor: color || theme.colors.neutral50,
    },
  });

  return (
    <SafeAreaView style={styles.base as ViewStyle}>{children}</SafeAreaView>
  );
}
