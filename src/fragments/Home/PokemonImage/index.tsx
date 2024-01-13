import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import FastImage from 'react-native-fast-image';
import {pokemonType} from '@/constants/pokemonType';
import IconArrow from '@assets/icons/icon-right-circle.svg';

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

  const imageUrl = detail?.sprites?.other['official-artwork'].front_default;

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
      <FastImage
        style={styles.artwork}
        source={{
          uri: `${imageUrl}`,
        }}
      />
      <View style={styles.info}>
        <TextView align="left" fz={10} color={theme.colors.black} fw="600">
          {name}
        </TextView>
        <View style={styles.typeContainer}>
          <View style={styles.type}>
            {detail &&
              detail?.types?.map((val: any) => {
                const getIcon = pokemonType.find(
                  type => type.name === val?.type?.name,
                );
                const Icon = getIcon?.icon;
                return (
                  <View key={val?.type?.name}>
                    {Icon && <Icon width={12} height={12} />}
                  </View>
                );
              })}
          </View>
          <IconArrow width={12} height={12} color={theme.colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  each: {
    backgroundColor: theme.colors.neutral50,
    borderColor: theme.colors.neutral200,
    borderWidth: 1,
    borderRadius: 4,
    width: '21.6%',
    alignItems: 'center',
    position: 'relative',
  },
  pokemonId: {
    color: theme.colors.neutral500,
    fontSize: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    backgroundColor: theme.colors.primary100,
    width: '100%',
    textAlign: 'right',
    paddingRight: 4,
    fontFamily: theme.font.reguler,
  },
  artwork: {
    width: 96,
    height: 96,
  },
  pokeTypes: {
    width: 24,
    height: 24,
  },
  info: {
    width: '100%',
    padding: 4,
    backgroundColor: theme.colors.white,
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral100,
    gap: 4,
    flex: 1,
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
