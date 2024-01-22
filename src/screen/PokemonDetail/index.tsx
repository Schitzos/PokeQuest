/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import HeaderScreen from '@components/HeaderScreen';
import {styles} from './styles';
import {PokemonDetailScreenProps} from './type';
// import ListBerry from '@/fragments/PokemonDetail/ListBerry';
import {pokemonType} from '@/constants/pokemonType';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import PokemonArt from '@/fragments/PokemonDetail/PokemonArt';
import PokemonAbout from '@/fragments/PokemonDetail/PokemonAbout';
import PokemonStat from '@/fragments/PokemonDetail/PokemonStat';
import FloatingButton from '@/fragments/PokemonDetail/FloatingButton';
import PokemonEvolveChain from '@/fragments/PokemonDetail/PokemonEvolveChain';

export default function PokemonDetail({route}: PokemonDetailScreenProps) {
  const {pokemonDetail, pokemonSpecies} = route.params;
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'about', title: 'About'},
    {key: 'stats', title: 'Stats'},
    {key: 'evolutions', title: 'Evolutions'},
  ]);

  const renderScene = SceneMap({
    about: () => (
      <PokemonAbout
        pokemonSpecies={pokemonSpecies}
        pokemonDetail={pokemonDetail}
      />
    ),
    stats: () => (
      <PokemonStat
        pokemonSpecies={pokemonSpecies}
        pokemonDetail={pokemonDetail}
      />
    ),
    evolutions: () => <PokemonEvolveChain pokemonSpecies={pokemonSpecies} />,
  });

  const baseColor = pokemonType.find(
    val => val.name === pokemonDetail.types[0].type.name,
  )?.baseColor;

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      pressColor={baseColor}
      scrollEnabled={false}
      indicatorStyle={{
        ...styles.tabBarIndicator,
        backgroundColor: baseColor,
      }}
      style={styles.tabBar}
      renderLabel={({route, focused}) => (
        <Text style={focused ? styles.tabBarTextFocus : styles.tabBarText}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <View style={styles.base}>
      <HeaderScreen
        align="center"
        label={pokemonDetail.name}
        color={baseColor}
      />
      <PokemonArt pokemonDetail={pokemonDetail} />
      <View style={styles.pokeStat}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
      <FloatingButton color={baseColor} />
    </View>
  );
}
