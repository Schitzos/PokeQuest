import * as React from 'react';
import {Animated as DefaultAnimated} from 'react-native';
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import {parallaxLayout} from './parallax';

import FastImage from 'react-native-fast-image';
import TextView from '@/components/TextView';
import theme from '@/theme';
import {usePokemon} from '@/hooks/usePokemon';
import Button from '@/components/Button';
import {PokemonEvolveData} from '@/types/EvolutionPokemon';

const windowWidth = Dimensions.get('window').width;
const PAGE_WIDTH = windowWidth / 2;

function EvolutionChainOption({
  viewEvolveChain,
  pokemonEvolveOption,
  handleChooseEvolution,
}: {
  viewEvolveChain: DefaultAnimated.Value;
  pokemonEvolveOption: PokemonEvolveData[] | undefined;
  handleChooseEvolution: (e: any) => void;
}) {
  const {pokemon} = usePokemon();
  return (
    <DefaultAnimated.View
      style={{
        opacity: viewEvolveChain,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 5000,
      }}>
      <View style={{flex: 1, justifyContent: 'center', gap: 16}}>
        <TextView color={theme.colors.white} align="center">
          Your Pokèmon have multiple option for evolution, please choose one..
        </TextView>
        <TextView color={theme.colors.white} align="center" fz={14}>
          {pokemon.selected.pokemonName} current weight "
          {pokemon.selected.currentExp}"
        </TextView>
        <Carousel
          loop={true}
          autoPlay={false}
          style={{
            width: windowWidth,
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          width={PAGE_WIDTH}
          snapEnabled={true}
          data={pokemonEvolveOption ? pokemonEvolveOption : []}
          renderItem={({item, index}) => {
            return (
              <CustomItem
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

interface ItemProps {
  id: number;
  name: string;
  weight: number | undefined;
  handleChooseEvolution: (e: any) => void;
}
const CustomItem: React.FC<ItemProps> = ({
  id,
  name,
  weight,
  handleChooseEvolution,
}) => {
  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        height: 500,
      }}>
      <FastImage
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          priority: FastImage.priority.high,
        }}
        style={{width: 225, height: 225}}
        defaultSource={require('@assets/images/default_image_loading.png')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TextView fz={20} color={theme.colors.white}>
        {name}
      </TextView>
      <TextView fz={14} color={theme.colors.white}>
        Weight Needed "{weight}"
      </TextView>
      <Button onPress={() => handleChooseEvolution({id: id})}>
        Choose {name}
      </Button>
    </View>
  );
};

export default EvolutionChainOption;
