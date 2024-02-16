import React, {useState} from 'react';
import {DashboardScreenProps} from './type';
import ListPokemon from '@/fragments/Home/ListPokemon';
import {View, SafeAreaView, Animated} from 'react-native';
import Search from '@/fragments/Shared/Search';
import {handleSearch} from './function';
import {
  handleScroll,
  pokeballOpacity,
  pokeballOpacitySearch,
  scrollY,
  searchAnimation,
  searchTranslateY,
  translateY,
} from './animation';
import {styles} from './styles';

export default function Dashboard({navigation}: DashboardScreenProps) {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.base}>
      <SafeAreaView style={styles.safeArea} />
      <Animated.View
        style={[
          styles.infoContainer,
          {
            transform: [
              {translateY: Animated.add(translateY, searchTranslateY)},
            ],
          },
        ]}>
        <Animated.Image
          style={[
            styles.appLogo,
            {opacity: search ? pokeballOpacitySearch : pokeballOpacity},
          ]}
          source={require('@assets/images/app_logo.png')}
        />
        <Search
          placeholder="Search Pokemon by Name or Pokemon ID"
          handleSearch={text => handleSearch(text, setSearch, searchAnimation)}
        />
      </Animated.View>
      <ListPokemon
        navigation={navigation}
        search={search}
        handleScroll={handleScroll}
        scrollY={scrollY}
        searchTranslateY={searchTranslateY}
      />
    </View>
  );
}
