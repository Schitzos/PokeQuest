import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Pressable} from 'react-native';
import {styles} from './styles';
import {pokemonType} from '@/constants/pokemonType';
import {Shake} from '@/utils/animation';
import FastImage from 'react-native-fast-image';
import {resetAnimations} from './animation';
import {useAnimation} from '@/hooks/useAnimation';
import {PokemonDetailResponse} from '@/types/DetailPokemon';

export default function PokemonArt({
  pokemonDetail,
  spark,
}: {
  pokemonDetail: PokemonDetailResponse;
  spark: boolean;
}) {
  const {animateOpacityHidden, animateOpacityShow} = useAnimation();
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bounce, setBounce] = useState(false);
  const opacityHidden = new Animated.Value(1);
  const opacityShow = new Animated.Value(0);

  const styleAnimate = bounce
    ? [{translateY: shakeAnimation}]
    : [{translateX: shakeAnimation}];

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

  useEffect(() => {
    if (imageLoaded) {
      Shake(shakeAnimation, 500);
    }
    setTimeout(() => {
      setBounce(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounce]);

  useEffect(() => {
    if (spark) {
      animateOpacityHidden(opacityHidden);
      animateOpacityShow(opacityShow);
    } else {
      resetAnimations(opacityHidden, opacityShow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spark]);

  return (
    <View style={styles.imageContainer}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={
            pokemonType?.find(
              val => val.name === pokemonDetail?.types[0]?.type?.name,
            )?.background
          }
          style={[styles.imageBackground, {opacity: opacityHidden}]}
        />
        <Animated.View
          style={[styles.choosenImageContainer, {opacity: opacityShow}]}>
          <FastImage
            style={styles.choosenImage}
            source={require('@assets/images/spark.gif')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Animated.View>
        <Pressable
          style={styles.artworkContainer}
          onPress={() => setBounce(true)}>
          <Animated.Image
            style={[
              styles.artwork,
              {transform: styleAnimate, opacity: opacityHidden},
            ]}
            source={{
              uri: pokemonDetail?.sprites?.other['official-artwork']
                .front_default,
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </Pressable>
      </View>
    </View>
  );
}
