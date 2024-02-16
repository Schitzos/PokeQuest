import React, {memo, useEffect, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import TextView from '@/components/TextView';
import {getSpeciesPokemonAlt} from '@/services/pokemon/pokemon.service';
import {PokemonItem, PokemonSpecies} from './type';
import theme from '@/theme';
import FastImage from 'react-native-fast-image';
import {pokemonColor} from '@/constants/pokemonColor';
import Skeleton from '@/components/Skeleton';
import {styles} from './styles';

function PokemonImage({name, id, navigation, isSearch}: PokemonItem) {
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
        setLoading(false);
        console.log('error get species', error);
      });
  }, [id]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PokemonDetail', {
          id: id,
        })
      }
      style={[styles.base, isSearch && styles.baseLarge]}>
      <View style={[styles.each, isSearch && styles.eachLarge]}>
        {loading && <Skeleton height={100} width={'100%'} />}
        {!loading && (
          <ImageBackground
            source={
              pokemonColor[species?.color?.name as keyof typeof pokemonColor]
            }
            style={[styles.background, isSearch && styles.backgroundLarge]}>
            <Text style={[styles.pokemonId, isSearch && styles.pokemonIdLarge]}>
              #{id}
            </Text>
            <FastImage
              style={[styles.artwork, isSearch && styles.artworkLarge]}
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                priority: FastImage.priority.high,
              }}
              defaultSource={require('@assets/images/default_image_loading.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </ImageBackground>
        )}
        <View style={[styles.info, isSearch && styles.infoLarge]}>
          <TextView
            align="center"
            fz={isSearch ? 14 : 10}
            color={theme.colors.black}
            fw="600">
            {name}
          </TextView>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(PokemonImage);
