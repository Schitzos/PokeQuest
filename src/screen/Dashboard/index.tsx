import React from 'react';
import TextView from '@components/TextView';
import {View, StyleSheet, SafeAreaView} from 'react-native';

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.base}>
      <View>
        <TextView>THIS IS DASHBOARD asdasd</TextView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#333333',
  },
  text: {
    color: 'red',
  },
});
