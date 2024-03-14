import React, {useEffect, useRef} from 'react';
import TextView from '@/components/TextView';
import {View, Animated} from 'react-native';
import {usePokemon} from '@/hooks/usePokemon';
import FastImage from 'react-native-fast-image';
import theme from '@/theme';
import * as Progress from 'react-native-progress';
import {useAnimation} from '@/hooks/useAnimation';
import {styles} from './styles';

export default function PokemonInfo() {
  const {pokemon} = usePokemon();
  const {animateOpacityHidden, animateOpacityShow} = useAnimation();
  const readyEvolve = useRef(new Animated.Value(0)).current;

  const currentExp: number =
    Number(
      (
        pokemon?.selected?.currentExp! / pokemon?.selected?.nextExpEvolve!
      ).toFixed(1),
    ) || 0;

  const handleColor = (value: number) => {
    if (value <= 0.3) {
      return theme.colors.error;
    } else if (value <= 0.6) {
      return theme.colors.warning;
    } else {
      return theme.colors.success;
    }
  };

  useEffect(() => {
    if (pokemon?.selected?.currentExp! >= pokemon?.selected?.nextExpEvolve!) {
      animateOpacityShow(readyEvolve);
    } else {
      animateOpacityHidden(readyEvolve);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon]);

  return (
    <View style={styles.pokemonInfo}>
      <Animated.View style={[styles.readyEvolve, {opacity: readyEvolve}]}>
        <FastImage
          source={require('@assets/images/electric-spark.gif')}
          style={styles.artSpark}
          defaultSource={require('@assets/images/default_image_loading.png')}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </Animated.View>
      <FastImage
        source={require('@assets/images/frame-circle.png')}
        style={styles.frameAvatar}
        resizeMode={FastImage.resizeMode.cover}>
        <FastImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon?.detail.id}.gif`,
            priority: FastImage.priority.low,
          }}
          style={styles.miniArt}
          defaultSource={require('@assets/images/default_image_loading.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </FastImage>
      <FastImage
        source={require('@assets/images/frame-rectangle.png')}
        style={styles.frame}
        resizeMode={FastImage.resizeMode.stretch}>
        <View style={styles.textInfoContainer}>
          <View style={styles.flexRowSpaceBetween}>
            <TextView fz={16} color={theme.colors.white}>
              {pokemon?.species.name}
            </TextView>
            <TextView fz={16} color={theme.colors.white}>
              #{pokemon?.detail.id}
            </TextView>
          </View>
          <View style={styles.flexRow}>
            <TextView fz={10} capitalize={false} color={theme.colors.white}>
              Weight
            </TextView>
            <View>
              <Progress.Bar
                progress={currentExp}
                color={handleColor(currentExp)}
                unfilledColor={theme.colors.neutral100}
                width={140}
              />
            </View>
            <TextView fz={10} capitalize={false} color={theme.colors.white}>
              {pokemon?.selected?.currentExp}/
              {pokemon?.selected?.nextExpEvolve.toFixed(0)}
            </TextView>
          </View>
        </View>
      </FastImage>
    </View>
  );
}
