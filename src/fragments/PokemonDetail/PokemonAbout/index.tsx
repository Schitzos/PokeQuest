import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import TextView from '@/components/TextView';
import {pokemonType} from '@/constants/pokemonType';
import theme from '@/theme';

export default function PokemonAbout({
  pokemonSpecies,
  pokemonDetail,
  labeled = false,
}: {
  pokemonSpecies: any;
  pokemonDetail: any;
  labeled?: boolean;
}) {
  const aboutData = [
    {
      label: 'Abilities',
      value: pokemonDetail?.abilities
        ?.map((ability: any) => ability.ability.name)
        .join(', '),
    },
  ];

  const englishDesc = pokemonSpecies?.flavor_text_entries?.filter(
    (val: any) => val.language.name === 'en',
  );

  const randomDesc = Math.floor(Math.random() * englishDesc.length);

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.base}>
        {labeled && (
          <TextView color={theme.colors.black} font={theme.font.bold}>
            About
          </TextView>
        )}
        <TextView align="left" color={theme.colors.neutral500}>
          {englishDesc[randomDesc].flavor_text.replace(/[\n\f]/g, ' ')}
        </TextView>
        <View style={styles.typesContainer}>
          <TextView color={theme.colors.black} font={theme.font.bold}>
            Types
          </TextView>
          <View style={styles.typeContainer}>
            {pokemonDetail &&
              pokemonDetail?.types?.map((val: any) => {
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
            {aboutData.map(val => {
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
