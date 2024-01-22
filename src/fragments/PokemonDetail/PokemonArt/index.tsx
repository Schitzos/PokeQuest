import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, ImageBackground} from 'react-native';
import {styles} from './styles';
import {pokemonType} from '@/constants/pokemonType';
import {Shake} from '@/utils/animation/shake';

export default function PokemonArt({pokemonDetail}: {pokemonDetail: any}) {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <View style={styles.imageContainer}>
      <ImageBackground
        source={
          pokemonType.find(val => val.name === pokemonDetail.types[0].type.name)
            ?.background
        }
        style={styles.imageBackground}>
        <Animated.Image
          style={[styles.artwork, {transform: [{translateX: shakeAnimation}]}]}
          source={{
            uri: pokemonDetail?.sprites?.other['official-artwork']
              .front_default,
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </ImageBackground>
    </View>
  );
}
