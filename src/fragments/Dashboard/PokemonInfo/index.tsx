import React from 'react';
import TextView from '@/components/TextView';
import {View, StyleSheet} from 'react-native';
import {usePokemon} from '@/hooks/usePokemon';
import FastImage from 'react-native-fast-image';
import theme from '@/theme';
import * as Progress from 'react-native-progress';

export default function PokemonInfo() {
  const {pokemon} = usePokemon();
  const currentExp: number =
    Number(
      (
        pokemon?.selected?.currentExp / pokemon?.selected?.nextExpEvolve
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

  return (
    <View style={styles.pokemonInfo}>
      <FastImage
        source={require('@assets/images/frame-circle.png')}
        style={styles.frameAvatar}
        resizeMode={FastImage.resizeMode.cover}>
        <FastImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.detail.id}.gif`,
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
              {pokemon.species.name}
            </TextView>
            <TextView fz={16} color={theme.colors.white}>
              #{pokemon.detail.id}
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

const styles = StyleSheet.create({
  pokemonInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    gap: 4,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  frameAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  frame: {
    justifyContent: 'center',
    height: 72,
    flex: 1,
    paddingHorizontal: 16,
  },
  textInfoContainer: {
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  miniArt: {
    width: 56,
    height: 56,
  },
  art: {
    width: 300,
    height: 300,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
