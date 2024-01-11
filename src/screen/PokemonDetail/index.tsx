import React from 'react';
import TextView from '@components/TextView';
import {Image, View} from 'react-native';
import HeaderScreen from '@components/HeaderScreen';
import {styles} from './styles';
import Content from '@components/Content';
import {PokemonDetailScreenProps} from './type';
import {debuglog} from '@/utils/common/debug';

export default function PokemonDetail({route}: PokemonDetailScreenProps) {
  const {pokemonDetail, pokemonSpecies} = route.params;
  debuglog('pokemonDetail', pokemonDetail.stats);
  return (
    <View style={styles.base}>
      <HeaderScreen
        label={'Pokemon Detail'}
        color={pokemonSpecies.color.name}
      />
      <Content>
        <Image
          style={styles.artwork}
          source={{
            uri: pokemonDetail?.sprites?.other['official-artwork']
              .front_default,
          }}
        />
        <TextView fw="bold" fz={24} align="center">
          {pokemonDetail.name}
        </TextView>
        {pokemonDetail.stats.map((val: any) => {
          return (
            <TextView fw="bold" align="center">
              {val.stat.name} {val.base_stat}
            </TextView>
          );
        })}
      </Content>
    </View>
  );
}
