import {Animated} from 'react-native';

export const handleSearch = (
  text: string,
  setSearch: (event: string) => void,
  searchAnimation: Animated.Value,
) => {
  setSearch(text);
  Animated.timing(searchAnimation, {
    toValue: text ? 1 : 0,
    duration: 300,
    useNativeDriver: true,
  }).start();
};
