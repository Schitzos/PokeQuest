import React from 'react';
import {View} from 'react-native';
import IconPokeball from '@assets/icons/icon-pokeball.svg';
import {styles} from './styles';
import theme from '@/theme';
import HeaderScreen from '@/components/HeaderScreen';
import TextView from '@/components/TextView';

export default function PokemonDetailError() {
  return (
    <View style={styles.base}>
      <HeaderScreen
        align="center"
        color={theme.colors.neutral500}
        label="Not found"
      />
      <View style={styles.imageLoading}>
        <IconPokeball width={200} height={200} />
      </View>
      <View style={styles.pokeStat}>
        <View style={styles.contentLoading}>
          <TextView align="center" capitalize={false} fz={16}>
            Ooops..
          </TextView>
          <TextView align="center" capitalize={false}>
            Pokè API didnt provide any detail for this Pokèmon, you can explore
            another Pokèmon to choose !!!
          </TextView>
        </View>
      </View>
    </View>
  );
}
