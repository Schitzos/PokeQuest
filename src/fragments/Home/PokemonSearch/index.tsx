import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import IconPokeBall from '@assets/icons/icon-pokeball.svg';
import {pokemonColor} from '@/constants/pokemonColor';

export default function PokemonSearch({name, navigation}: PokemonItem) {
  const pokemonSpecies = getSpeciesPokemon({
    name: name,
    key: ['getSpeciesPokemon', name],
  });

  const species = (pokemonSpecies?.data || {}) as PokemonSpeciesDataResponse;

  const pokemonDetail = getDetailPokemon({
    id: species ? species?.id?.toString() : '',
    key: ['getDetailPokemon', species ? species?.id?.toString() : ''],
  });

  const detail = (pokemonDetail?.data || {}) as PokemonDetailDataResponse;

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
      <ImageBackground
        source={
          pokemonColor.find(val => val.name === species?.color?.name)
            ?.background || require('@assets/images/default_image_loading.png')
        }
        style={styles.background}>
        <Text style={styles.pokemonId}>
          {pokemonSpecies.isLoading ? 'Loading' : `#${species?.id || 'null'}`}
        </Text>
        <FastImage
          style={styles.artwork}
          source={{
            uri: imageUrl,
            priority: FastImage.priority.high,
          }}
          defaultSource={require('@assets/images/default_image_loading.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </ImageBackground>
      <View style={styles.info}>
        <TextView align="left" fz={10} color={theme.colors.black} fw="600">
          {name}
        </TextView>
        <View style={styles.typeContainer}>
          <View style={styles.type}>
            {detail && !pokemonDetail.isLoading ? (
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
              })
            ) : (
              <IconPokeBall width={12} height={12} />
            )}
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
    width: '50%',
    alignItems: 'center',
    position: 'relative',
  },
  background: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  pokemonId: {
    color: theme.colors.neutral100,
    fontSize: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    width: '100%',
    textAlign: 'right',
    paddingRight: 4,
    fontFamily: theme.font.reguler,
  },
  artwork: {
    width: 200,
    height: 200,
    marginLeft: -8,
  },
  imageLoading: {
    width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  pokeTypes: {
    width: 24,
    height: 24,
  },
  info: {
    width: '100%',
    padding: 4,
    backgroundColor: theme.colors.white,
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
