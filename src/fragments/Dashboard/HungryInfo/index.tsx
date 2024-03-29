import React, {useEffect, useState} from 'react';
import {View, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import TextView from '@/components/TextView';
import {useAnimation} from '@/hooks/useAnimation';
import {usePokemon} from '@/hooks/usePokemon';
import {styles} from './styles';

export default function HungryInfo() {
  const {pokemon} = usePokemon();
  const {animateOpacityToggle} = useAnimation();
  const [selectedText, setSelectedText] = useState('');
  const opacityAnimation = new Animated.Value(0);

  const randomHungryText = [
    'I am hungry..',
    'Give me some berry..',
    `${pokemon?.selected.pokemonName} is starving..`,
    'Feed me please..',
    'Hungry for a treat!',
    'In need of a snack...',
    'Time for a meal!',
    'Craving some food...',
    `${pokemon?.selected.pokemonName} wants to eat!`,
  ];

  const randomEatText = [
    `${pokemon?.selected.pokemonName} loves berries!`,
    'Berries vanish quickly!',
    `${pokemon?.selected.pokemonName} enjoys munching!`,
    `Berry bliss for ${pokemon?.selected.pokemonName}`,
    'Satisfied after berry feast!',
    'Quick berry snack!',
    `${pokemon?.selected.pokemonName} devours berries!`,
    'Satisfied berry craving!',
    `${pokemon?.selected.pokemonName} craves more berries!`,
  ];

  const randomNotLikeBerryText = [
    `${pokemon?.selected.pokemonName} doesn't like this berry...`,
    'Yuck! Not this berry...',
    `Nope, this berry is a no-go for ${pokemon?.selected.pokemonName}...`,
    'Sorry, not a fan of this berry...',
    'Looks like this berry wont do...',
    `${pokemon?.selected.pokemonName} doesn't like this...`,
    'Not a fan of this berry...',
    'This one a pass...',
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
    setSelectedText(
      getRandomText(
        pokemon?.selected?.currentExp! > pokemon?.selected?.prevExp!
          ? randomEatText
          : randomNotLikeBerryText,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon?.selected]);

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
