import React from 'react';
import TextView from '@components/TextView';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/navigation/types';
import SafeArea from '@components/SafeArea';
import Button from '@components/Button';
import Content from '@components/Content';
import theme from '@theme/index';

type DashboardScreenProps = {
  route: any;
  navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
};

export default function Dashboard({navigation}: DashboardScreenProps) {
  return (
    <SafeArea>
      <Content color={theme.colors.neutral50}>
        <TextView>This is Dashboard</TextView>
        <Button onPress={() => navigation.navigate('PokemonDetail')} size="md">
          Detail
        </Button>
      </Content>
    </SafeArea>
  );
}
