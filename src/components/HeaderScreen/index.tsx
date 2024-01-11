import SafeArea from '@components/SafeArea';
import theme from '@theme/index';
import React from 'react';
import {Button, View} from 'react-native';
import {styles} from './styles';
import TextView from '@components/TextView';
import {useNavigation} from '@react-navigation/native';

interface HeaderScreenProps {
  label: string;
}

export default function HeaderScreen({label}: HeaderScreenProps) {
  const navigation = useNavigation();
  return (
    <SafeArea color={theme.colors.primary}>
      <View style={styles.base}>
        <Button title="back" onPress={() => navigation.goBack()} />
        <TextView color={theme.colors.white}>{label}</TextView>
      </View>
    </SafeArea>
  );
}
