import React from 'react';
import TextView from '@/components/TextView';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';

export interface BerryItemProps {
  name: string;
  handleSelectBerry: (data: string) => void;
  selectedBerry: string;
}

export interface BerryItemDataResponse {
  name: string;
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
        defaultSource={require('@assets/images/default_image_loading.png')}
      />
      <TextView fz={10}>{name}</TextView>
    </TouchableOpacity>
  );
}
