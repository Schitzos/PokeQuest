import * as React from 'react';
import {Animated as DefaultAnimated, StyleSheet} from 'react-native';
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {parallaxLayout} from './parallax';
import TextView from '@/components/TextView';
import theme from '@/theme';
import {usePokemon} from '@/hooks/usePokemon';
import {PokemonEvolveData} from '@/types/EvolutionPokemon';
import EvolutionChainItem from '../EvolutionChainItem';

const windowWidth = Dimensions.get('window').width;
const PAGE_WIDTH = windowWidth / 2;

function EvolutionChainOption({
  viewEvolveChain,
  pokemonEvolveOption,
  handleChooseEvolution,
}: {
  viewEvolveChain: DefaultAnimated.Value;
  pokemonEvolveOption: PokemonEvolveData[] | undefined;
  handleChooseEvolution: (e: number) => void;
}) {
  const {pokemon} = usePokemon();
  return (
    <DefaultAnimated.View style={[styles.base, {opacity: viewEvolveChain}]}>
      <View style={styles.content}>
        <TextView color={theme.colors.white} align="center">
          Your Pokèmon have multiple option for evolution, please choose one..
        </TextView>
        <TextView color={theme.colors.white} align="center" fz={14}>
          {pokemon?.selected.pokemonName} current weight "
          {pokemon?.selected.currentExp}"
        </TextView>
        <Carousel
          loop={true}
          autoPlay={false}
          style={[styles.carouselCustom, {width: windowWidth}]}
          width={PAGE_WIDTH}
          snapEnabled={true}
          data={pokemonEvolveOption ? pokemonEvolveOption : []}
          renderItem={({item, index}) => {
            return (
              <EvolutionChainItem
                key={index}
                id={item.species_id}
                name={item.species_name}
                weight={item.species_weight}
                handleChooseEvolution={e => handleChooseEvolution(e)}
              />
            );
          }}
          customAnimation={parallaxLayout(
            {
              size: PAGE_WIDTH,
              vertical: false,
            },
            {
              parallaxScrollingScale: 1,
              parallaxAdjacentItemScale: 0.5,
              parallaxScrollingOffset: 40,
            },
          )}
          scrollAnimationDuration={1200}
        />
      </View>
    </DefaultAnimated.View>
  );
}

export default EvolutionChainOption;

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 5000,
    paddingVertical: '50%',
  },
  content: {
    justifyContent: 'center',
    gap: 16,
  },
  carouselCustom: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
