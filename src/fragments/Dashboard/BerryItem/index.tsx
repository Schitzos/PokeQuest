import React from 'react';
import TextView from '@/components/TextView';
import {StyleSheet, TouchableOpacity} from 'react-native';
import theme from '@/theme';
import FastImage from 'react-native-fast-image';

export interface BerryItemProps {
  name: string;
  handleSelectBerry: (data: any) => void;
  selectedBerry: any;
}

export interface BerryItemDataResponse {
  name: any;
  item: {
    url: string;
  };
}

export interface BerryItemDetailDataResponse {
  firmness: {
    name: string;
  };
  id: number;
}

export default function BerryItem({
  name,
  handleSelectBerry,
  selectedBerry,
}: BerryItemProps) {
  const isSelected = selectedBerry === name;

  return (
    <TouchableOpacity
      style={[styles.base, isSelected && styles.selectedBase]}
      onPress={() => handleSelectBerry(name)}>
      <FastImage
        style={styles.berryArt}
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}-berry.png`,
        }}
      />
      <TextView fz={10}>{name}</TextView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '33%',
    alignItems: 'center',
    paddingVertical: 4,
  },
  selectedBase: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  berryArt: {
    width: 16,
    height: 16,
  },
});
