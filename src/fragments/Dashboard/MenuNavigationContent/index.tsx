import TextView from '@/components/TextView';
import PokemonStat from '@/fragments/PokemonDetail/PokemonStat';
import {usePokemon} from '@/hooks/usePokemon';
import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from '@/components/Button';
import PokemonAbout from '@/fragments/PokemonDetail/PokemonAbout';
import PokemonEvolveChain from '@/fragments/PokemonDetail/PokemonEvolveChain';
import Feed from '../Feed';
import {styles} from './styles';

export default function MenuNavigation({
  handleRemovePokemon,
}: {
  handleRemovePokemon: () => void;
}) {
  const {pokemon} = usePokemon();
  const [activeFragments, setActiveFragments] = useState('home');

  const menuNavigation = [
    {
      label: 'Home',
      icon: require('@assets/images/normal-ball.png'),
      route: 'home',
      component: (
        <PokemonAbout
          labeled={true}
          pokemonDetail={pokemon?.detail!}
          pokemonSpecies={pokemon?.species!}
        />
      ),
      sidebar: false,
    },
    {
      label: 'Stats',
      icon: require('@assets/images/ultra-ball.png'),
      route: 'stat',
      sidebar: true,
      component: (
        <PokemonStat pokemonDetail={pokemon?.detail!} labeled={true} />
      ),
    },
    {
      label: 'Feed',
      icon: require('@assets/images/great-ball.png'),
      route: 'feed',
      component: <Feed />,
      sidebar: false,
    },
    {
      label: 'Evolve',
      icon: require('@assets/images/master-ball.png'),
      route: 'evolve',
      component: (
        <PokemonEvolveChain
          currentState={pokemon?.selected.pokemonName!}
          pokemonEvolve={pokemon?.selected.evolveChain!}
          labeled={true}
          redirect={false}
        />
      ),
      sidebar: true,
    },
    {
      label: 'Profile',
      icon: require('@assets/images/repeat-ball.png'),
      route: 'profile',
      component: (
        <View style={styles.profile}>
          <Button onPress={() => handleRemovePokemon()}>remove pokemon</Button>
        </View>
      ),
      sidebar: false,
    },
  ];

  const fragments = menuNavigation.find(
    val => val.route === activeFragments,
  )?.component;

  return (
    <View style={styles.base}>
      <FastImage
        source={require('@assets/images/stat-frame.png')}
        style={styles.content}
        defaultSource={require('@assets/images/default_image_loading.png')}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <View style={styles.fragmentContainer}>{fragments}</View>
      <View style={styles.bottomNavigation}>
        {menuNavigation
          .map(val => {
            if (!val.sidebar) {
              return (
                <TouchableOpacity
                  style={styles.navigation}
                  key={val.label}
                  onPress={() => setActiveFragments(val.route)}>
                  <FastImage source={val.icon} style={styles.icon} />
                  <TextView fz={10}>{val.label}</TextView>
                </TouchableOpacity>
              );
            }
          })
          .filter(Boolean)}
      </View>
      <View style={styles.sideNavigation}>
        {menuNavigation
          .map(val => {
            if (val.sidebar) {
              return (
                <TouchableOpacity
                  onPress={() => setActiveFragments(val.route)}
                  style={styles.sideTouchNav}
                  key={val.label}>
                  <FastImage source={val.icon} style={styles.sideIcon} />
                  <TextView fz={10}>{val.label}</TextView>
                </TouchableOpacity>
              );
            }
          })
          .filter(Boolean)}
      </View>
    </View>
  );
}
