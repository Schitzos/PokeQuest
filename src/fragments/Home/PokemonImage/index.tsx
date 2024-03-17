import React, {memo, useEffect, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import TextView from '@/components/TextView';
import {getSpeciesPokemonAlt} from '@/services/pokemon/pokemon.service';
import {PokemonImageProps} from './type';
import theme from '@/theme';
import FastImage from 'react-native-fast-image';
import {pokemonColor} from '@/constants/pokemonColor';
import Skeleton from '@/components/Skeleton';
import {styles} from './styles';
import {PokemonSpeciesResponse} from '@/types/SpeciesPokemon';
import analytics from '@react-native-firebase/analytics';

function PokemonImage({name, id, navigation, isSearch}: PokemonImageProps) {
  const [species, setSpecies] = useState<PokemonSpeciesResponse | undefined>();
  const [loading, setLoading] = useState(true);

  const handleNavigateToDetail = async () => {
    analytics().logEvent('detail_pokemon', {
      pokemon_name: name,
      pokemon_id: id,
    });
    navigation.navigate('PokemonDetail', {
      id: id,
    });
  };

  useEffect(() => {
    getSpeciesPokemonAlt({
      id: id,
    })
      .then((res: PokemonSpeciesResponse) => {
        setSpecies(res);
        setLoading(false);
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log('error get species', error);
      });
  }, [id]);

  return (
    <TouchableOpacity
      onPress={() => handleNavigateToDetail()}
      style={[styles.base, isSearch && styles.baseLarge]}>
      <View style={[styles.each, isSearch && styles.eachLarge]}>
        {loading && <Skeleton height={isSearch ? 220 : 100} width={'100%'} />}
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
