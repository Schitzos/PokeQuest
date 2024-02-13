import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextView from '@/components/TextView';
import {getSpeciesPokemonAlt} from '@/services/pokemon/pokemon.service';
import {PokemonItem, PokemonSpecies} from './type';
import theme from '@/theme';
import FastImage from 'react-native-fast-image';
import {pokemonColor} from '@/constants/pokemonColor';
import Skeleton from '@/components/Skeleton';

export default function PokemonImage({name, id, navigation}: PokemonItem) {
  const [species, setSpecies] = useState<PokemonSpecies | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSpeciesPokemonAlt({
      id: id,
    })
      .then((res: any) => {
        setSpecies(res);
        setLoading(false);
      })
      .catch((error: any) => {
        console.log('error get species', error);
      });
  }, [id]);

  if (loading) {
    return <Skeleton height={120} width={'21%'} />;
  }

  return (
    <TouchableOpacity
      style={styles.each}
      onPress={() =>
        navigation.navigate('PokemonDetail', {
          id: id,
        })
      }>
      {!loading && (
        <ImageBackground
          source={
            pokemonColor[species?.color?.name as keyof typeof pokemonColor]
          }
          style={styles.background}
          defaultSource={require('@assets/images/app_logo.png')}>
          <Text style={styles.pokemonId}>#{id}</Text>
          <FastImage
            style={styles.artwork}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              priority: FastImage.priority.high,
            }}
            defaultSource={require('@assets/images/default_image_loading.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </ImageBackground>
      )}
      <View style={styles.info}>
        <TextView align="center" fz={10} color={theme.colors.black} fw="600">
          {name}
        </TextView>
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
    width: 96,
    height: 96,
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
