import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface TextViewProps {
  children: React.ReactNode;
  color?: string;
}

export default function TextView({children, color = '#333'}: TextViewProps) {
  const styles = StyleSheet.create({
    base: {
      color: color,
    },
  });

  return <Text style={styles.base}>{children}</Text>;
}
