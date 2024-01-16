import SafeArea from '@components/SafeArea';
import theme from '@theme/index';
import React from 'react';
import {styles} from './styles';
import TextView from '@components/TextView';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import IconChevronLeft from '@assets/icons/icon-chevron-left.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface HeaderScreenProps {
  label: string;
  color?: string;
}

export default function HeaderScreen({
  label,
  color = theme.colors.white,
}: HeaderScreenProps) {
  const navigation = useNavigation();
  return (
    <SafeArea color={color}>
      <View style={styles.base}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconChevronLeft color={theme.colors.white} />
        </TouchableOpacity>
        <TextView color={theme.colors.white} fz={16} fw="bold">
          {label}
        </TextView>
      </View>
    </SafeArea>
  );
}