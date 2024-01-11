import React from 'react';
import TextView from '@components/TextView';
import SafeArea from '@components/SafeArea';
import Button from '@components/Button';
import Content from '@components/Content';
import theme from '@theme/index';
import {DashboardScreenProps} from './type';
import ListPokemon from '@/fragments/Pokemon/ListPokemon';

export default function Dashboard({navigation}: DashboardScreenProps) {
  return (
    <SafeArea>
      <Content color={theme.colors.neutral50}>
        <TextView>This is Dashboard</TextView>
        <ListPokemon />
        <Button onPress={() => navigation.navigate('PokemonDetail')} size="md">
          Detail
        </Button>
      </Content>
    </SafeArea>
  );
}
