import React, {useEffect} from 'react';
import Navigation from './navigation';
import SplashScreen from 'react-native-splash-screen';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClientConfig} from './config/tanstack';

const queryClient = queryClientConfig;

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}

export default App;
