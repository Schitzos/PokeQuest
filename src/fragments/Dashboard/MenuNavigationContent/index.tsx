import TextView from '@/components/TextView';
import PokemonStat from '@/fragments/PokemonDetail/PokemonStat';
import {usePokemon} from '@/hooks/usePokemon';
import theme from '@/theme';
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from '@/components/Button';
import PokemonAbout from '@/fragments/PokemonDetail/PokemonAbout';
import PokemonEvolveChain from '@/fragments/PokemonDetail/PokemonEvolveChain';
import Feed from '../Feed';

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
          pokemonDetail={pokemon.detail}
          pokemonSpecies={pokemon.species}
        />
      ),
      sidebar: false,
    },
    {
      label: 'Stats',
      icon: require('@assets/images/ultra-ball.png'),
      route: 'stat',
      sidebar: true,
      component: <PokemonStat pokemonDetail={pokemon.detail} labeled={true} />,
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
          currentState={pokemon.selected.pokemonName}
          pokemonEvolve={pokemon.selected.evolveChain}
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

const styles = StyleSheet.create({
  base: {
    height: '35%',
    width: '100%',
    position: 'absolute',
    bottom: -8,
  },
  bottomNavigation: {
    position: 'absolute',
    backgroundColor: theme.colors.white,
    bottom: 0,
    width: '100%',
    height: Platform.OS === 'ios' ? 80 : 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopColor: theme.colors.primary,
    borderTopWidth: 4,
  },
  navigation: {
    alignItems: 'center',
    flex: 1,
  },
  sideNavigation: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 8,
    top: -156,
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 16,
  },
  sideTouchNav: {
    alignItems: 'center',
  },
  sideIcon: {
    width: 48,
    height: 48,
  },
  icon: {
    width: 24,
    height: 24,
  },
  content: {
    height: Platform.OS === 'ios' ? '80%' : '85%',
    padding: 16,
    marginTop: -16,
    width: '100%',
  },
  profile: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fragmentContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    height: 200,
    paddingHorizontal: 16,
  },
});
