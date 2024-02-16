import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Pressable} from 'react-native';
import {styles} from './styles';
import {pokemonType} from '@/constants/pokemonType';
import {Shake} from '@/utils/animation/shake';
import FastImage from 'react-native-fast-image';
import {
  animateBackgroundColor,
  animateOpacityHidden,
  animateOpacityShow,
  opacityHidden,
  opacityShow,
  resetAnimations,
} from './animation';

export default function PokemonArt({
  pokemonDetail,
  spark,
}: {
  pokemonDetail: any;
  spark: boolean;
}) {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bounce, setBounce] = useState(false);

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
      animateOpacityHidden();
      animateOpacityShow();
      animateBackgroundColor();
    } else {
      resetAnimations();
    }
  }, [spark]);

  console.log(spark);

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
