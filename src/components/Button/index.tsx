import theme from '@/theme';
import React from 'react';
import {StyleSheet, ViewStyle, Text, TouchableOpacity} from 'react-native';

interface ContentProps {
  children: React.ReactNode;
  color?: string;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  color,
  onPress = () => null,
  size = 'md',
  fullWidth = false,
  disabled = false,
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
      padding: 12,
      fontSize: 16,
      borderRadius: 16,
    },
  };

  const styles = StyleSheet.create({
    base: {
      backgroundColor: color || theme.colors.primary,
      padding: styleSize[size].padding,
      borderRadius: styleSize[size].borderRadius,
      justifyContent: 'center',
      flex: fullWidth ? 1 : 0,
    },
    label: {
      fontSize: styleSize[size].fontSize,
      textAlign: 'center',
      color: theme.colors.white,
      fontFamily: theme.font.reguler,
    },
    disabled: {
      backgroundColor: theme.colors.neutral100,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.base as ViewStyle, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.label}>{children}</Text>
    </TouchableOpacity>
  );
}
