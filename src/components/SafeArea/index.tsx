import theme from '@/theme';
import React from 'react';
import {StyleSheet, SafeAreaView, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface SafeAreaProps {
  children: React.ReactNode;
  color?: string;
  handleScroll?: () => void;
  isScrollable?: boolean;
}

export default function SafeArea({
  children,
  color,
  handleScroll,
  isScrollable = false,
}: SafeAreaProps) {
  const styles = StyleSheet.create({
    base: {
      backgroundColor: color || theme.colors.neutral50,
    },
  });

  const onScroll = (event: any) => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      handleScroll && handleScroll();
    }
  };

  return (
    <SafeAreaView style={styles.base as ViewStyle}>
      {isScrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={true}
          onScroll={onScroll}
          scrollEventThrottle={16}>
          {children}
        </ScrollView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
}
