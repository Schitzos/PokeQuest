import React, {useEffect, useState} from 'react';
import TextView from '@components/TextView';
import SafeArea from '@components/SafeArea';
import Content from '@components/Content';
import theme from '@theme/index';
import {DashboardScreenProps} from './type';
import ListPokemon from '@/fragments/Pokemon/ListPokemon';

export default function Dashboard({navigation}: DashboardScreenProps) {
  const [loadMore, setLoadMore] = useState(false);

  const handleScroll = () => {
    setLoadMore(true);
  };

  useEffect(() => {
    setLoadMore(false);
  }, [loadMore]);

  return (
    <SafeArea isScrollable={true} handleScroll={handleScroll}>
      <Content color={theme.colors.neutral50}>
        <TextView fz={24} fw="bold">
          PokeQuest
        </TextView>
        <ListPokemon navigation={navigation} loadMore={loadMore} />
      </Content>
    </SafeArea>
  );
}
