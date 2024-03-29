import SafeArea from '@components/SafeArea';
import theme from '@theme/index';
import React from 'react';
import {styles} from './styles';
import TextView from '@components/TextView';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import IconChevronLeft from '@assets/icons/icon-chevron-left.svg';
import {HeaderScreenProps} from './type';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigation/types';

export default function HeaderScreen({
  label,
  color = theme.colors.white,
  align = 'center',
}: HeaderScreenProps) {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'PokemonDetail'>>();
  return (
    <SafeArea color={color}>
      <View style={styles.base}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconChevronLeft color={theme.colors.white} />
        </TouchableOpacity>
        <TextView color={theme.colors.white} fz={24} align={align}>
          {label}
        </TextView>
      </View>
    </SafeArea>
  );
}
