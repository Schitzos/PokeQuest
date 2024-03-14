/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {usePokemon} from '@/hooks/usePokemon';
import FastImage from 'react-native-fast-image';
import PokemonInfo from '@/fragments/Dashboard/PokemonInfo';
import {WalkX, WalkY, reverseX} from '@/utils/animation';
import HungryInfo from '../HungryInfo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextView from '@/components/TextView';
import theme from '@/theme';
import {isLatestEvolve} from '@/utils/common/evolution';
import {useAnimation} from '@/hooks/useAnimation';
import {styles} from './styles';

export default function PokemonArt({
  handleEvolve,
}: {
  handleEvolve: (e: number) => void;
}) {
  const {pokemon} = usePokemon();
  const {animateOpacityHidden, animateOpacityShow} = useAnimation();
  const walkAnimationX = useRef(new Animated.Value(0)).current;
  const walkAnimationY = useRef(new Animated.Value(0)).current;
  const reverse = useRef(new Animated.Value(0)).current;
  const btnEvolveAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const combinedAnimation = Animated.parallel([
      Animated.loop(WalkX(walkAnimationX, 1000)),
      Animated.loop(WalkY(walkAnimationY, 500)),
    ]);
    combinedAnimation.start();

    const reverseInterval = setInterval(() => {
      reverseX(reverse, 500);
    }, 6000);

    return () => {
      combinedAnimation.stop();
      clearInterval(reverseInterval);
    };
  }, [walkAnimationX, walkAnimationY]);

  useEffect(() => {
    if (
      pokemon &&
      pokemon?.selected?.currentExp >= pokemon?.selected?.nextExpEvolve
    ) {
      animateOpacityShow(btnEvolveAnimation);
    } else {
      animateOpacityHidden(btnEvolveAnimation);
    }
  }, [pokemon]);

  return (
    <View style={styles.container}>
      <PokemonInfo />
      <View style={styles.artContainer}>
        <Animated.View
          style={{
            transform: [
              {translateX: walkAnimationX},
              {translateY: walkAnimationY},
            ],
          }}>
          <Animated.View
            style={[
              styles.artWrapper,
              {
                transform: [
                  {
                    scaleX: reverse.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, -1],
                    }),
                  },
                ],
              },
            ]}>
            <FastImage
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.detail.id}.png`,
                priority: FastImage.priority.high,
              }}
              style={styles.art}
              defaultSource={require('@assets/images/default_image_loading.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Animated.View>
          {pokemon && <HungryInfo pokemon={pokemon} />}
        </Animated.View>
        {pokemon &&
          pokemon?.selected?.currentExp >= pokemon?.selected?.nextExpEvolve &&
          !isLatestEvolve(
            pokemon?.selected?.evolveChain?.evolveTo!,
            pokemon.selected.pokemonId,
          ) && (
            <Animated.View
              style={[
                styles.btnEvolveContainer,
                {opacity: btnEvolveAnimation},
              ]}>
              <TouchableOpacity
                onPress={() => handleEvolve(pokemon.detail.id)}
                style={styles.btnEvolve}>
                <TextView fz={16} color={theme.colors.white}>
                  Evolve
                </TextView>
              </TouchableOpacity>
            </Animated.View>
          )}
      </View>
    </View>
  );
}
