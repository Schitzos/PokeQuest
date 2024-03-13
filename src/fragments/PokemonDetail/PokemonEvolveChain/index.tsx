/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TextView from '@/components/TextView';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigation/types';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import theme from '@/theme';
import {PokemonEvolveData} from '@/types/EvolutionPokemon';

interface PokemonEvolveChainProps {
  pokemonEvolve: PokemonEvolveData;
  currentState: string;
  labeled?: boolean;
  redirect?: boolean;
}

const PokemonEvolveChain: React.FC<PokemonEvolveChainProps> = ({
  pokemonEvolve,
  currentState,
  labeled = false,
  redirect = true,
}) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'PokemonDetail'>>();

  const PokemonNode: React.FC<{pokemon: PokemonEvolveData}> = ({pokemon}) => (
    <View style={styles.base}>
      <TouchableOpacity
        style={[
          styles.baseBorder,
          currentState === pokemon.species_name && styles.selected,
        ]}
        onPress={() =>
          redirect &&
          navigation.navigate('PokemonDetail', {
            id: pokemon.species_id,
            tab: 0,
          })
        }>
        <FastImage
          style={styles.artwork}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.species_id}.gif`,
            priority: FastImage.priority.low,
          }}
          defaultSource={require('@assets/images/default_image_loading.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <TextView>{pokemon.species_name}</TextView>
      </TouchableOpacity>
      {pokemon.evolveTo && (
        <View style={styles.childBase}>
          {pokemon.evolveTo.map((evolve: PokemonEvolveData, index: number) => (
            <View style={styles.childWrapper} key={index}>
              <TextView>{'>'}</TextView>
              <PokemonNode pokemon={evolve} />
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.baseContainer}>
        {labeled && (
          <View style={styles.labeled}>
            <TextView color={theme.colors.black} font={theme.font.bold}>
              Evolution Chain:
            </TextView>
          </View>
        )}
        <PokemonNode pokemon={pokemonEvolve} />
      </View>
    </ScrollView>
  );
};

export default PokemonEvolveChain;
