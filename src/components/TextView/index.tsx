import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface TextViewProps {
  children: React.ReactNode;
  color?: string;
  fz?: number;
  fw?: '400' | '600' | '700' | 'bold' | 'normal';
  align?: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined;
  capitalize?: boolean;
}

export default function TextView({
  children,
  color = '#333',
  fz = 12,
  fw = 'normal',
  align = 'left',
  capitalize = true,
}: TextViewProps) {
  const styles = StyleSheet.create({
    base: {
      color: color,
      fontSize: fz,
      fontWeight: fw,
      textAlign: align,
      textTransform: capitalize ? 'capitalize' : 'none',
    },
  });

  return <Text style={styles.base}>{children}</Text>;
}
