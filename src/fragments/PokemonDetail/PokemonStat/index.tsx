import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import TextView from '@/components/TextView';
import * as Progress from 'react-native-progress';
import {statColor} from '@/utils/common/stat';
import theme from '@/theme';
import {PokemonDetailResponse} from '@/types/DetailPokemon';

export default function PokemonStat({
  pokemonDetail,
  labeled = false,
}: {
  pokemonDetail: PokemonDetailResponse;
  labeled?: boolean;
}) {
  return (
    <View style={styles.base}>
      {labeled && (
        <View style={styles.labeled}>
          <TextView color={theme.colors.black} font={theme.font.bold}>
            Pokemon Stats:
          </TextView>
        </View>
      )}
      {pokemonDetail.stats.map(val => (
        <View key={val.stat.name} style={styles.perStat}>
          <TextView align="center" color={theme.colors.black50}>
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
      {!labeled && (
        <View style={styles.measurementContainer}>
          <View style={styles.meassurmentItem}>
            <TextView align="center" color={theme.colors.neutral500}>
              Height
            </TextView>
            <TextView fz={16} color={theme.colors.black50}>
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
            <TextView fz={16} color={theme.colors.black50}>
              {Math.round(pokemonDetail.weight * 0.1)} kg
            </TextView>
          </View>
        </View>
      )}
    </View>
  );
}
