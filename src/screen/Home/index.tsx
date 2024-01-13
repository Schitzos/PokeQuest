import React, {useEffect, useState} from 'react';
import theme from '@theme/index';
import {DashboardScreenProps} from './type';
import ListPokemon from '@/fragments/Home/ListPokemon';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  Image,
} from 'react-native';

export default function Dashboard({navigation}: DashboardScreenProps) {
  const [loadMore, setLoadMore] = useState(false);

  const handleScroll = () => {
    setLoadMore(true);
  };

  const onScroll = (event: any) => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      handleScroll && handleScroll();
    }
  };

  useEffect(() => {
    setLoadMore(false);
  }, [loadMore]);

  return (
    <View style={styles.base}>
      <SafeAreaView style={styles.safeArea} />
      <ScrollView
        showsVerticalScrollIndicator={true}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        <View style={styles.infoContainer}>
          <Image
            style={styles.pokeball}
            source={require('@assets/images/app_logo.png')}
          />
          <TextInput
            autoCapitalize="none"
            placeholder={'Search Pokemon by Name or Pokemon ID'}
            style={styles.search}
            // value={inputValue}
            // onChangeText={text => setInputValue(text)}
            // onSubmitEditing={handleSubmitSearch}
          />
        </View>
        <ListPokemon navigation={navigation} loadMore={loadMore} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  safeArea: {
    backgroundColor: theme.colors.primary,
  },
  infoContainer: {
    backgroundColor: theme.colors.primary,
    gap: 16,
    padding: 16,
    paddingBottom: 38,
  },
  textGroup: {
    gap: 8,
    marginBottom: 64,
  },
  content: {
    flex: 1,
  },
  search: {
    backgroundColor: theme.colors.white,
    paddingVertical: Platform.OS === 'android' ? 8 : 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    color: theme.colors.black,
    borderColor: theme.colors.primary100,
    borderWidth: 2,
  },
  pokeball: {
    width: 256,
    height: 256,
    alignSelf: 'center',
    zIndex: 1000,
  },
});
