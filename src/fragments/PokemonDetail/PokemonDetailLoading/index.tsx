import React from 'react';
import {View} from 'react-native';
import IconPokeball from '@assets/icons/icon-pokeball.svg';
import {styles} from './styles';
import theme from '@/theme';
import HeaderScreen from '@/components/HeaderScreen';
import Skeleton from '@/components/Skeleton';

export default function PokemonDetailLoading() {
  return (
    <View style={styles.base}>
      <HeaderScreen align="center" color={theme.colors.neutral500} />
      <View style={styles.imageLoading}>
        <IconPokeball width={200} height={200} />
      </View>
      <View style={styles.pokeStat}>
        <View style={styles.tabLoading}>
          <Skeleton width={'30%'} />
          <Skeleton width={'30%'} />
          <Skeleton width={'30%'} />
        </View>
        <View style={styles.contentLoading}>
          <Skeleton width={'40%'} />
          <Skeleton width={'80%'} />
          <Skeleton width={'50%'} />
          <Skeleton width={'60%'} />
          <Skeleton width={'90%'} />
        </View>
      </View>
    </View>
  );
}
