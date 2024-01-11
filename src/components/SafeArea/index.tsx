// SafeArea.js
import React from 'react';
import {StyleSheet, SafeAreaView, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface SafeAreaProps {
  children: React.ReactNode;
  color?: string; // Allow color to be a string or undefined
}

export default function SafeArea({children, color}: SafeAreaProps) {
  const styles = StyleSheet.create({
    base: {
      backgroundColor: color || 'transparent',
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.base as ViewStyle}>
      <ScrollView showsVerticalScrollIndicator={true}>{children}</ScrollView>
    </SafeAreaView>
  );
}
