import theme from '@/theme';
import React from 'react';
import {StyleSheet, SafeAreaView, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface SafeAreaProps {
  children: React.ReactNode;
  color?: string;
  isScrollable?: boolean;
}

export default function SafeArea({
  children,
  color,
  isScrollable = false,
}: SafeAreaProps) {
  const styles = StyleSheet.create({
    base: {
      backgroundColor: color || theme.colors.neutral50,
    },
  });

  return (
    <SafeAreaView style={styles.base as ViewStyle}>
      {isScrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}>
          {children}
        </ScrollView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
}
