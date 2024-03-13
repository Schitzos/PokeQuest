import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import TextView from '@/components/TextView';
import {pokemonType} from '@/constants/pokemonType';
import theme from '@/theme';
import {PokemonSpeciesResponse} from '@/types/SpeciesPokemon';
import {Ability, PokemonDetailResponse} from '@/types/DetailPokemon';

export default function PokemonAbout({
  pokemonSpecies,
  pokemonDetail,
  labeled = false,
}: {
  pokemonSpecies: PokemonSpeciesResponse;
  pokemonDetail: PokemonDetailResponse;
  labeled?: boolean;
}) {
  const aboutData = [
    {
      label: 'Abilities',
      value: pokemonDetail?.abilities
        ?.map((ability: Ability) => ability.ability.name)
        .join(', '),
    },
  ];

  const englishDesc = pokemonSpecies?.flavor_text_entries?.filter(
    val => val.language.name === 'en',
  );

  let description = 'No Description for this Pokémon';

  if (englishDesc && englishDesc.length > 0) {
    const randomDesc = Math.floor(Math.random() * englishDesc.length);
    const selectedDesc = englishDesc[randomDesc];
    if (selectedDesc && selectedDesc.flavor_text) {
      description = selectedDesc.flavor_text.replace(/[\n\f]/g, ' ');
    }
  }

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.base}>
        {labeled && (
          <TextView color={theme.colors.black} font={theme.font.bold}>
            About
          </TextView>
        )}
        <TextView align="left" color={theme.colors.neutral500}>
          {description}
        </TextView>
        <View style={styles.typesContainer}>
          <TextView color={theme.colors.black} font={theme.font.bold}>
            Types
          </TextView>
          <View style={styles.typeContainer}>
            {pokemonDetail &&
              pokemonDetail?.types?.map(val => {
                const getIcon = pokemonType.find(
                  type => type.name === val?.type?.name,
                );
                const Icon = getIcon?.icon;
                return (
                  <View style={styles.type} key={val.type.name}>
                    {Icon && <Icon width={24} height={24} />}
                    <TextView
                      align="center"
                      fz={12}
                      color={theme.colors.neutral500}>
                      {val.type.name}
                    </TextView>
                  </View>
                );
              })}
          </View>
        </View>
        <View style={styles.typesContainer}>
          <TextView color={theme.colors.black} font={theme.font.bold}>
            Abilities
          </TextView>
          <View style={styles.type}>
            {aboutData?.map(val => {
              return (
                <TextView
                  align="left"
                  color={theme.colors.neutral500}
                  key={val.value}>
                  {val.value}
                </TextView>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
