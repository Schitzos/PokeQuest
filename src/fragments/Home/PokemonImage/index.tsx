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
import ScreenPerformanceTrace from '@/config/fbPerformance/screenPerformanceTrace';

function PokemonImage({name, id, navigation, isSearch}: PokemonImageProps) {
  const trace = ScreenPerformanceTrace('load_each_pokemon_data');
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
    let isMounted = true;
    getSpeciesPokemonAlt({
      id: id,
    })
      .then((res: PokemonSpeciesResponse) => {
        if (isMounted) {
          setSpecies(res);
          setLoading(false);
          trace.stop();
        }
      })
      .catch((error: Error) => {
        setLoading(false);
        console.log('error get species', error);
      });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    trace.start();
    return () => {
      trace.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                // uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
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
