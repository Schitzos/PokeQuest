import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, ImageBackground} from 'react-native';
import TextView from '@components/TextView';
import HeaderScreen from '@components/HeaderScreen';
import {styles} from './styles';
import {PokemonDetailScreenProps} from './type';
// import ListBerry from '@/fragments/PokemonDetail/ListBerry';
import {Shake} from '@/utils/animation/shake';
import * as Progress from 'react-native-progress';
import {statColor} from '@/utils/common/stat';
import {pokemonType} from '@/constants/pokemonType';
import theme from '@/theme';

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
        color={
          pokemonType.find(val => val.name === pokemonDetail.types[0].type.name)
            ?.baseColor
        }
      />
      <View style={styles.imageContainer}>
        <ImageBackground
          source={
            pokemonType.find(
              val => val.name === pokemonDetail.types[0].type.name,
            )?.background
          }
          style={styles.imageBackground}>
          <Animated.Image
            style={[
              styles.artwork,
              {transform: [{translateX: shakeAnimation}]},
            ]}
            source={{
              uri: pokemonDetail?.sprites?.other['official-artwork']
                .front_default,
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </ImageBackground>
      </View>
      <View style={styles.pokeStat}>
        <TextView
          fw="bold"
          fz={24}
          align="center"
          font={theme.font.regularMine}>
          {pokemonDetail.name}
        </TextView>
        <TextView fw="bold" fz={12} align="center">
          {pokemonSpecies.flavor_text_entries[0].flavor_text
            .replace(/\n/g, ' ')
            .replace(/\f/g, ' ')}
        </TextView>
        {pokemonDetail.stats.map((val: any) => (
          <View key={val.stat.name} style={styles.perStat}>
            <TextView fw="bold" align="center">
              {val.stat.name}
            </TextView>
            <View style={styles.progressParent}>
              <Progress.Bar
                progress={val.base_stat / 100}
                color={statColor(val.base_stat)}
                width={175}
              />
              <TextView fw="bold" align="center">
                {val.base_stat}
              </TextView>
            </View>
          </View>
        ))}
        <View style={styles.perStat}>
          <TextView fw="bold" align="center">
            weight
          </TextView>
          <View style={styles.progressParent}>
            <Progress.Bar
              progress={pokemonDetail.weight / 1000}
              color={statColor(pokemonDetail.weight / 10)}
              width={175}
            />
            <TextView fw="bold" align="center">
              {pokemonDetail.weight}
            </TextView>
          </View>
        </View>
        {pokemonDetail.types.map((val: any, idx: number) => (
          <TextView fw="bold" align="center" key={val.type.name}>
            type {idx + 1} {val.type.name}
          </TextView>
        ))}
      </View>
    </View>
  );
}
