import {Animated, Easing} from 'react-native';

export const shakeAnimation = new Animated.Value(0);
export const opacityHidden = new Animated.Value(1);
export const translateY = new Animated.Value(0);

export const handleBallAnimation = ({
  handleChoosePokemon,
}: {
  handleChoosePokemon: () => void;
}) => {
  Animated.timing(translateY, {
    toValue: -500,
    duration: 500,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start(() => {
    Animated.timing(opacityHidden, {
      toValue: 0,
      duration: 100, // Adjust the duration as needed
      useNativeDriver: true,
    }).start(() => {
      handleChoosePokemon();
    });
  });
};
