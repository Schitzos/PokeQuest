import React from 'react';
import {StyleSheet, ViewStyle, View} from 'react-native';

interface ContentProps {
  children: React.ReactNode; // Allow color to be a string or undefined
  color: string;
}

export default function Content({children, color}: ContentProps) {
  const styles = StyleSheet.create({
    base: {
      backgroundColor: color || 'transparent',
      padding: 16,
      flex: 1,
      gap: 8,
    },
  });

  return <View style={styles.base as ViewStyle}>{children}</View>;
}
