import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface TextViewProps {
  children: React.ReactNode;
  color?: string;
  fz?: number;
  fw?: '400' | '600' | '700' | 'bold' | 'normal';
  align?: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined;
}

export default function TextView({
  children,
  color = '#333',
  fz = 12,
  fw = 'normal',
  align = 'left',
}: TextViewProps) {
  const styles = StyleSheet.create({
    base: {
      color: color,
      fontSize: fz,
      fontWeight: fw,
      textAlign: align,
    },
  });

  return <Text style={styles.base}>{children}</Text>;
}
