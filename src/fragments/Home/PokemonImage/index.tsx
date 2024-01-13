import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TextView from '@/components/TextView';
import {
  getDetailPokemon,
  getSpeciesPokemon,
} from '@/services/pokemon/pokemon.service';
import {
  PokemonDetailDataResponse,
  PokemonItem,
  PokemonSpeciesDataResponse,
} from './type';
import theme from '@/theme';
import {pokemonType} from '@/constants/pokemonType';
import IconArrow from '@assets/icons/icon-arrow-light-square-color.svg';

export default function PokemonImage({name, navigation}: PokemonItem) {
  const pokemonSpecies = getSpeciesPokemon({
    name: name,
    key: ['getListPokemon', name],
  });

  const species = (pokemonSpecies?.data || {}) as PokemonSpeciesDataResponse;

  const pokemonDetail = getDetailPokemon({
    id: species ? species?.id?.toString() : '',
    key: ['getDetailPokemon', species ? species?.id?.toString() : ''],
  });

  const detail = (pokemonDetail?.data || {}) as PokemonDetailDataResponse;

  if (pokemonSpecies.isLoading || pokemonDetail.isLoading) {
    return <TextView>Loading Image</TextView>;
  }

  return (
    <TouchableOpacity
      style={styles.each}
      onPress={() =>
        navigation.navigate('PokemonDetail', {
          pokemonDetail: detail,
          pokemonSpecies: species,
        })
      }>
      <Text style={styles.pokemonId}>#{species?.id}</Text>
      {detail && (
        <Image
          style={styles.artwork}
          source={{
            uri: detail?.sprites?.other['official-artwork'].front_default,
          }}
        />
      )}
      <View style={styles.info}>
        <TextView align="left" fz={14} color={theme.colors.black} fw="600">
          {name}
        </TextView>
        <View style={styles.typeContainer}>
          <View style={styles.type}>
            {detail.types.map((val: any) => {
              const Icon = pokemonType.find(
                type => type.name === val?.type?.name,
              )?.icon;
              return (
                <View key={val?.type?.name}>
                  {Icon && <Icon width={24} height={24} />}
                </View>
              );
            })}
          </View>
          <IconArrow />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  each: {
    backgroundColor: theme.colors.neutral50,
    borderColor: theme.colors.primary200,
    borderWidth: 2,
    borderRadius: 8,
    width: '47.5%',
    alignItems: 'center',
    position: 'relative',
  },
  pokemonId: {
    color: theme.colors.neutral300,
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 8,
  },
  artwork: {
    padding: 16,
    width: 150,
    height: 150,
  },
  pokeTypes: {
    width: 24,
    height: 24,
  },
  info: {
    width: '100%',
    padding: 8,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    gap: 8,
  },
  typeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    flexDirection: 'row',
    gap: 4,
  },
});
