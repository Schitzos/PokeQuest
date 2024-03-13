import {Alert, BackHandler} from 'react-native';
import {HandleBackPressParams} from '../Home/type';
import RNExitApp from 'react-native-exit-app';

export const handleBackPress = ({
  routeName,
  doubleBackToExitPressedOnce,
}: HandleBackPressParams) => {
  return () => {
    if (routeName === 'Dashboard' && doubleBackToExitPressedOnce.current) {
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
