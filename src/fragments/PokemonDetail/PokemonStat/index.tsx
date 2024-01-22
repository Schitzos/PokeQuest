import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import TextView from '@/components/TextView';
import * as Progress from 'react-native-progress';
import {statColor} from '@/utils/common/stat';
import theme from '@/theme';

export default function PokemonStat({
  pokemonDetail,
}: {
  pokemonSpecies: any;
  pokemonDetail: any;
}) {
  return (
    <View style={styles.base}>
      {pokemonDetail.stats.map((val: any) => (
        <View key={val.stat.name} style={styles.perStat}>
          <TextView align="center" color={theme.colors.neutral500}>
            {val.stat.name}
          </TextView>
          <View style={styles.progressParent}>
            <Progress.Bar
              progress={val.base_stat / 100}
              color={statColor(val.base_stat)}
              width={175}
            />
            <TextView align="center">{val.base_stat}</TextView>
          </View>
        </View>
      ))}
      <View style={styles.measurementContainer}>
        <View style={styles.meassurmentItem}>
          <TextView align="center" color={theme.colors.neutral500}>
            Height
          </TextView>
          <TextView fz={16} color={theme.colors.neutral500}>
            {pokemonDetail.height * 10} cm
          </TextView>
        </View>
        <View style={styles.meassurmentItem}>
          <TextView
            align="center"
            color={theme.colors.neutral500}
            capitalize={false}>
            Weight
          </TextView>
          <TextView fz={16} color={theme.colors.neutral500}>
            {pokemonDetail.weight * 0.1} kg
          </TextView>
        </View>
      </View>
    </View>
  );
}
