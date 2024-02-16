import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {PreloadScreenProps} from './type';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

export default function Preload({navigation}: PreloadScreenProps) {
  const {getItem} = useAsyncStorage('pokemon-data');
  const [selectedPokemon, setSelectedPokemon] = useState<null | boolean>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkSelected = async () => {
      try {
        const data = await getItem();
        if (data) {
          setSelectedPokemon(true);
        } else {
          setSelectedPokemon(false);
        }
        setLoaded(true);
      } catch (error) {
        console.error('Error check selected pokemon:', error);
      }
    };

    checkSelected();
  }, [getItem]);

  useEffect(() => {
    if (loaded && selectedPokemon) {
      navigation.navigate('PetNavigator');
    } else {
      navigation.navigate('Home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return <View />;
}
