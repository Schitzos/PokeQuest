/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Platform, Animated} from 'react-native';
import {usePokemon} from '@/hooks/usePokemon';
import FastImage from 'react-native-fast-image';
import PokemonInfo from '@/fragments/Dashboard/PokemonInfo';
import {WalkX, WalkY, reverseX} from '@/utils/animation';
import HungryInfo from '../HungryInfo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextView from '@/components/TextView';
import theme from '@/theme';
import {
  animateOpacityHidden,
  animateOpacityShow,
} from '@/fragments/PokemonDetail/PokemonArt/animation';
import {isLatestEvolve} from '@/utils/common/evolution';

export default function PokemonArt({
  handleEvolve,
}: {
  handleEvolve: (e: number) => void;
}) {
  const {pokemon} = usePokemon();
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
    if (pokemon?.selected?.currentExp >= pokemon?.selected?.nextExpEvolve) {
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
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.detail.id}.png`,
                priority: FastImage.priority.high,
              }}
              style={styles.art}
              defaultSource={require('@assets/images/default_image_loading.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Animated.View>
          <HungryInfo pokemon={pokemon} />
        </Animated.View>
        {pokemon?.selected?.currentExp >= pokemon?.selected?.nextExpEvolve &&
          !isLatestEvolve(
            pokemon.selected.evolveChain.evolveTo,
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

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  contentDashboard: {
    height: '35%',
    padding: 16,
    marginTop: -16,
    width: '100%',
  },
  contentFeed: {
    height: '30%',
    padding: 16,
    marginTop: -16,
    width: '100%',
  },
  content: {
    height: '30%',
    padding: 16,
    marginTop: -16,
    width: '100%',
  },
  backgroundImage: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  artContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    top: '25%',
  },
  artWrapper: {
    zIndex: 0,
  },
  btnFeedContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 0 : 24,
    width: 96,
  },
  art: {
    width: 300,
    height: 300,
  },
  hungryContainer: {
    position: 'absolute',
    width: 120,
    height: 90,
    top: -32,
    right: 0,
    display: 'flex',
  },
  hungry: {
    position: 'absolute',
    width: 150,
    height: 120,
    top: 0,
    right: 100,
    display: 'flex',
  },
  hungryText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 32,
  },
  statFrame: {
    flex: 1,
  },
  btnEvolveContainer: {
    zIndex: 3000,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 16 : -20,
    // bottom: 64,
  },
  btnEvolve: {
    backgroundColor: 'rgba(0, 175, 240, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.black50,
  },
});
