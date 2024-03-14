import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextView from '@/components/TextView';
import theme from '@/theme';
import BerryScore from '../BerryScore';
import ListBerry from '../ListBerry';

export default function Feed() {
  return (
    <View style={styles.container}>
      <View style={styles.labeled}>
        <TextView color={theme.colors.black} font={theme.font.bold}>
          Berries List:
        </TextView>
      </View>
      <ListBerry />
      <BerryScore />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    zIndex: 1000,
    width: '100%',
    position: 'absolute',
    left: 16,
  },
  labeled: {
    padding: 16,
  },
});
