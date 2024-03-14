import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TextView from '@/components/TextView';
import theme from '@/theme';
import Button from '@/components/Button';

interface ItemProps {
  id: number;
  name: string;
  weight: number | undefined;
  handleChooseEvolution: (e: number) => void;
}
const EvolutionChainItem: React.FC<ItemProps> = ({
  id,
  name,
  weight,
  handleChooseEvolution,
}) => {
  return (
    <View style={styles.base}>
      <FastImage
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          priority: FastImage.priority.high,
        }}
        style={styles.image}
        defaultSource={require('@assets/images/default_image_loading.png')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <TextView fz={20} color={theme.colors.white}>
        {name}
      </TextView>
      <TextView fz={14} color={theme.colors.white}>
        Weight Needed "{weight}"
      </TextView>
      <Button onPress={() => handleChooseEvolution(id)}>Choose {name}</Button>
    </View>
  );
};

export default EvolutionChainItem;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  image: {
    width: 225,
    height: 225,
  },
});
