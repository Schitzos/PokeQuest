import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import TextView from '@/components/TextView';
import {animateOpacityToggle} from '@/fragments/PokemonDetail/PokemonArt/animation';

interface Pokemon {
  selected: {
    pokemonName: string;
    currentExp: number;
  };
}

interface HungryInfoProps {
  pokemon: Pokemon;
}

export default function HungryInfo({pokemon}: HungryInfoProps) {
  const [selectedText, setSelectedText] = useState('');
  const opacityAnimation = new Animated.Value(0);

  const randomHungryText = [
    'I am hungry..',
    'Give me some berry..',
    `${pokemon.selected.pokemonName} is starving..`,
    'Feed me please..',
    'Hungry for a treat!',
    'In need of a snack...',
    'Time for a meal!',
    'Craving some food...',
    `${pokemon.selected.pokemonName} wants to eat!`,
  ];

  const randomEatText = [
    `${pokemon.selected.pokemonName} loves berries!`,
    'Berries vanish quickly!',
    `${pokemon.selected.pokemonName} enjoys munching!`,
    `Berry bliss for ${pokemon.selected.pokemonName}`,
    'Satisfied after berry feast!',
    'Quick berry snack!',
    `${pokemon.selected.pokemonName} devours berries!`,
    'Satisfied berry craving!',
    `${pokemon.selected.pokemonName} craves more berries!`,
  ];

  const getRandomText = (randomText: string[]) =>
    randomText[Math.floor(Math.random() * randomText.length)];

  useEffect(() => {
    setSelectedText(getRandomText(randomHungryText));
    setTimeout(() => {
      animateOpacityToggle(opacityAnimation, 2000);
    }, 1000);

    const intervalId = setInterval(() => {
      setSelectedText(getRandomText(randomHungryText));
    }, 22000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    animateOpacityToggle(opacityAnimation, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedText]);

  useEffect(() => {
    setSelectedText(getRandomText(randomEatText));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.selected]);

  return (
    <Animated.View
      style={[styles.hungryContainer, {opacity: opacityAnimation}]}>
      <FastImage
        source={require('@assets/images/hungry-image.png')}
        style={styles.hungry}
        defaultSource={require('@assets/images/default_image_loading.png')}
        resizeMode={FastImage.resizeMode.contain}>
        <View style={styles.hungryText}>
          <TextView align="center">{selectedText}</TextView>
        </View>
      </FastImage>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  hungryContainer: {
    position: 'absolute',
    width: 150,
    height: 120,
    top: -64,
    right: 0,
    display: 'flex',
  },
  hungry: {
    width: 150,
    height: 120,
    top: 0,
    right: 0,
    display: 'flex',
  },
  hungryText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    marginTop: -16,
    paddingHorizontal: 8,
  },
});
