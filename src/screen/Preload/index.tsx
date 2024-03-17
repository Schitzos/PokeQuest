import React, {useEffect} from 'react';
import {View} from 'react-native';
import {PreloadScreenProps} from './type';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

export default function Preload({navigation}: PreloadScreenProps) {
  const {getItem} = useAsyncStorage('pokemon-data');

  useEffect(() => {
    const checkSelected = async () => {
      try {
        const data = await getItem();
        if (data) {
          navigation.navigate('Dashboard');
        } else {
          navigation.navigate('Home');
        }
      } catch (error) {
        console.error('Error check selected pokemon:', error);
      }
    };

    checkSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <View />;
}
