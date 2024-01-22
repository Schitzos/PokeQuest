import React from 'react';
import Button from '@/components/Button';
import {View} from 'react-native';
import {styles} from './styles';

export default function FloatingButton({color}: {color: string | undefined}) {
  return (
    <View style={styles.container}>
      <Button onPress={() => {}} fullWidth={true} size="lg" color={color}>
        Choose This Pokemon
      </Button>
    </View>
  );
}
