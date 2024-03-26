// App.js

import React, {useEffect} from 'react';
import Navigation from './navigation';
import ContextProvider from './context';
import {LogBox} from 'react-native';
import {setupNetInfoListener} from './utils/netInfo';
import setupRemoteConfig from './utils/remoteConf';

function App() {
  useEffect(() => {
    const unsubscribe = setupNetInfoListener();
    setupRemoteConfig();

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
