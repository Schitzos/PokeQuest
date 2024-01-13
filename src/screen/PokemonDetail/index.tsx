import React, {useEffect, useRef, useState} from 'react';
import {View, Animated} from 'react-native';
import TextView from '@components/TextView';
import HeaderScreen from '@components/HeaderScreen';
import {styles} from './styles';
import Content from '@components/Content';
import {PokemonDetailScreenProps} from './type';
import ListBerry from '@/fragments/PokemonDetail/ListBerry';
import {Shake} from '@/utils/animation/shake';

export default function PokemonDetail({route}: PokemonDetailScreenProps) {
  const {pokemonDetail, pokemonSpecies} = route.params;

  const [imageLoaded, setImageLoaded] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (imageLoaded) {
      Shake(shakeAnimation, 1000);
      const intervalId = setInterval(() => {
        Shake(shakeAnimation, 1000);
      }, 10000);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageLoaded]);

  return (
    <View style={styles.base}>
      <HeaderScreen
        label={'Pokemon Detail'}
        color={pokemonSpecies.color.name}
      />
      <Content>
        <Animated.Image
          style={[styles.artwork, {transform: [{translateX: shakeAnimation}]}]}
          source={{
            uri: pokemonDetail?.sprites?.other['official-artwork']
              .front_default,
          }}
          onLoad={() => setImageLoaded(true)}
        />
        <TextView fw="bold" fz={24} align="center">
          {pokemonDetail.name}
        </TextView>
        {pokemonDetail.stats.map((val: any) => (
          <TextView fw="bold" align="center" key={val.stat.name}>
            {val.stat.name} {val.base_stat}
          </TextView>
        ))}
        <TextView fw="bold" align="center">
          weight {pokemonDetail.weight}
        </TextView>
        {pokemonDetail.types.map((val: any, idx: number) => (
          <TextView fw="bold" align="center" key={val.type.name}>
            type {idx + 1} {val.type.name}
          </TextView>
        ))}
        <ListBerry />
      </Content>
    </View>
  );
}
