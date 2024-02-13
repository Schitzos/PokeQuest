import React from 'react';
import Button from '@/components/Button';
import {View} from 'react-native';
import {styles} from './styles';

export default function FloatingButton({
  color,
  onPress,
}: {
  color: string | undefined;
  onPress: () => void;
}) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => onPress()}
        fullWidth={true}
        size="lg"
        color={color}>
        Choose This Pokemon
      </Button>
    </View>
  );
}
