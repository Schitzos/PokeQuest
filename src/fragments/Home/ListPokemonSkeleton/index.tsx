import React from 'react';
import Skeleton from '@/components/Skeleton';
import {View, StyleSheet} from 'react-native';

export default function ListPokemonSkeleton() {
  const numberOfSkeletons = 12;
  return (
    <View style={styles.base}>
      {[...Array(numberOfSkeletons)].map((_, index) => (
        <Skeleton height={150} width={'21%'} key={index} />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  base: {
    flex: 1,
    position: 'relative',
    gap: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
