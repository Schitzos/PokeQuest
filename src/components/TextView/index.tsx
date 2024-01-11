import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface TextViewProps {
  children: React.ReactNode;
}

export default function TextView({children}: TextViewProps) {
  return <Text style={styles.base}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: {
    color: '#F00',
  },
});
