import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import Navigation from './navigation';
import ContextProvider from './context';
import NetInfo from '@react-native-community/netinfo';
import {LogBox} from 'react-native';

function App() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(networkState => {
      if (!networkState.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection and try again.',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  LogBox.ignoreLogs(['Warning: componentWillReceiveProps has been renamed']);
  LogBox.ignoreAllLogs();

  return (
    <ContextProvider>
      <Navigation />
    </ContextProvider>
  );
}

export default App;
