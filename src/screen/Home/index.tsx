import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, BackHandler} from 'react-native';
import Search from '@/fragments/Shared/Search';
import ListPokemon from '@/fragments/Home/ListPokemon';
import Sound from 'react-native-sound';
import {handleBackPress, handleSearch, playBackgroundMusic} from './function';
import {handleScroll, resetScrollY, scrollY, translateY} from './animation';
import {styles} from './styles';
import {DashboardScreenProps} from './type';
import {useFocusEffect} from '@react-navigation/native';
import OnBoarding from '@/fragments/Home/OnBoarding';

export default function Dashboard({navigation, route}: DashboardScreenProps) {
  const [search, setSearch] = useState('');
  const doubleBackToExitPressedOnce = useRef(false);
  const soundRef = useRef<Sound | null>(null);

  const handleHardwareBackPress = useCallback(() => {
    return handleBackPress({
      routeName: route.name,
      doubleBackToExitPressedOnce,
    });
  }, [route.name, doubleBackToExitPressedOnce]);

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleHardwareBackPress(),
    );
    return () => backHandler.remove();
  });

  useEffect(() => {
    // playBackgroundMusic(soundRef);
  }, []);

  return (
    <View style={styles.base}>
      <SafeAreaView style={styles.safeArea} />
      <OnBoarding search={search} translateY={translateY}>
        <Search
          placeholder="Search Pokemon by Name or Pokemon ID"
          handleSearch={text => handleSearch(text, setSearch, resetScrollY)}
        />
      </OnBoarding>
      <ListPokemon
        navigation={navigation}
        search={search}
        handleScroll={handleScroll}
        scrollY={scrollY}
        soundRef={soundRef}
      />
    </View>
  );
}
