import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import {getEvolveChain} from '@/services/pokemon/pokemon.service';
import PokemonSprite from '../PokemonSprite';
import {parseEvolutionChain} from '@/utils/common/evolution';

export default function PokemonEvolveChain({
  pokemonSpecies,
}: {
  pokemonSpecies: any;
}) {
  const pokemonEvolveChain = getEvolveChain({
    key: ['getEvolveChain'],
    id: pokemonSpecies.evolution_chain.url.split('/').reverse()[1],
  });

  const evolveChain =
    pokemonEvolveChain.data && parseEvolutionChain(pokemonEvolveChain?.data);

  return (
    <ScrollView>
      <View style={styles.base}>
        {evolveChain?.map(val => {
          return (
            <PokemonSprite
              currentState={pokemonSpecies.name}
              name={val?.species_name}
              key={val?.species_name}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}
