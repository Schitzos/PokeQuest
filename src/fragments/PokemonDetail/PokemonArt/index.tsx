import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, ImageBackground, Pressable} from 'react-native';
import {styles} from './styles';
import {pokemonType} from '@/constants/pokemonType';
import {Shake} from '@/utils/animation/shake';

export default function PokemonArt({pokemonDetail}: {pokemonDetail: any}) {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bounce, setBounce] = useState(false);

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

  const styleAnimate = bounce
    ? [{translateY: shakeAnimation}]
    : [{translateX: shakeAnimation}];

  return (
    <View style={styles.imageContainer}>
      <ImageBackground
        source={
          pokemonType?.find(
            val => val.name === pokemonDetail?.types[0]?.type?.name,
          )?.background
        }
        style={styles.imageBackground}>
        <Pressable
          style={styles.artworkContainer}
          onPress={() => setBounce(true)}>
          <Animated.Image
            style={[styles.artwork, {transform: styleAnimate}]}
            source={{
              uri: pokemonDetail?.sprites?.other['official-artwork']
                .front_default,
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </Pressable>
      </ImageBackground>
    </View>
  );
}
