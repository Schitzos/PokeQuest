import {Animated} from 'react-native';

export const opacityHidden = new Animated.Value(1);
export const opacityShow = new Animated.Value(0);
export const backgroundColor = new Animated.Value(0);

export const animateOpacityHidden = () => {
  Animated.timing(opacityHidden, {
    toValue: 0,
    duration: 300, // Adjust the duration as needed
    useNativeDriver: true,
  }).start();
};
export const animateOpacityShow = () => {
  Animated.timing(opacityShow, {
    toValue: 1,
    duration: 300, // Adjust the duration as needed
    useNativeDriver: true,
  }).start();
};

export const animateBackgroundColor = () => {
  Animated.timing(backgroundColor, {
    toValue: 1,
    duration: 300, // Adjust the duration as needed
    useNativeDriver: true, // useNativeDriver: false for backgroundColor
  }).start();
};

export const resetAnimations = () => {
  // Reset opacity values
  opacityHidden.setValue(1);
  opacityShow.setValue(0);
  // Reset background color value
  backgroundColor.setValue(0);
};
