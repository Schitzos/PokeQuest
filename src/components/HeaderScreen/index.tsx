import SafeArea from '@components/SafeArea';
import theme from '@theme/index';
import React from 'react';
import {styles} from './styles';
import TextView from '@components/TextView';
import {useNavigation} from '@react-navigation/native';
import Button from '../Button';
import {View} from 'react-native';

interface HeaderScreenProps {
  label: string;
  color?: string;
}

export default function HeaderScreen({
  label,
  color = '#FFF',
}: HeaderScreenProps) {
  const navigation = useNavigation();
  return (
    <SafeArea color={color}>
      <View style={styles.base}>
        <Button onPress={() => navigation.goBack()}>Back</Button>
        <TextView color={theme.colors.white} fz={16} fw="bold">
          {label}
        </TextView>
      </View>
    </SafeArea>
  );
}
