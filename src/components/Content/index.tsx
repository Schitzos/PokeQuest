// SafeArea.js
import React from 'react';
import {StyleSheet, ViewStyle, View} from 'react-native';

interface ContentProps {
  children: React.ReactNode;
  color?: string; // Allow color to be a string or undefined
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
