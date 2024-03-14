import {Alert, Animated, AppState, BackHandler} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {HandleBackPressParams, SoundRef} from './type';
import Sound from 'react-native-sound';

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

export const handleBackPress = ({
  routeName,
  doubleBackToExitPressedOnce,
}: HandleBackPressParams) => {
  return () => {
    if (routeName === 'Home' && doubleBackToExitPressedOnce.current) {
      Alert.alert('Exit PokèQuest', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => (doubleBackToExitPressedOnce.current = false),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            RNExitApp.exitApp();
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    }

    doubleBackToExitPressedOnce.current = true;
    setTimeout(() => {
      doubleBackToExitPressedOnce.current = false;
    }, 2000);

    return true;
  };
};

export function playBackgroundMusic(soundRef: SoundRef) {
  soundRef.current = new Sound(
    'https://cdn.pixabay.com/audio/2023/03/12/audio_0763df1ad9.mp3',
    '',
    error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      soundRef.current?.play();
      soundRef.current?.setNumberOfLoops(-1);
    },
  );

  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'background' && soundRef.current) {
      soundRef.current.pause();
    }
    if (nextAppState === 'active' && soundRef.current) {
      soundRef.current.play();
    }
  };

  AppState.addEventListener('change', handleAppStateChange);

  return () => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
    }
  };
}

export const handleRemovePokemon = (removePokemon, navigation) => {
  removePokemon();
  navigation.navigate('Home');
};
