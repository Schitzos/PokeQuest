import React from 'react';
import TextView from '@components/TextView';
import {View} from 'react-native';
import HeaderScreen from '@components/HeaderScreen';
import {styles} from './styles';
import Content from '@components/Content';

export default function PokemonDetail() {
  return (
    <View style={styles.base}>
      <HeaderScreen label={'Pokemon Detail'} />
      <Content>
        <TextView>This is Pokemon detail</TextView>
      </Content>
    </View>
  );
}
