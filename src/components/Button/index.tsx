import theme from '@theme/index';
import React from 'react';
import {StyleSheet, ViewStyle, Text, TouchableOpacity} from 'react-native';

interface ContentProps {
  children: React.ReactNode;
  color?: string;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  color,
  onPress = () => {},
  size = 'md',
}: ContentProps) {
  const styleSize = {
    sm: {
      padding: 4,
      fontSize: 12,
      borderRadius: 4,
    },
    md: {
      padding: 8,
      fontSize: 16,
      borderRadius: 8,
    },
    lg: {
      padding: 16,
      fontSize: 24,
      borderRadius: 16,
    },
  };

  const styles = StyleSheet.create({
    base: {
      backgroundColor: color || theme.colors.primary,
      padding: styleSize[size].padding,
      borderRadius: styleSize[size].borderRadius,
      justifyContent: 'center',
    },
    label: {
      fontSize: styleSize[size].fontSize,
      textAlign: 'center',
      color: theme.colors.white,
    },
  });

  return (
    <TouchableOpacity
      style={styles.base as ViewStyle}
      onPress={() => onPress()}>
      <Text style={styles.label}>{children}</Text>
    </TouchableOpacity>
  );
}
