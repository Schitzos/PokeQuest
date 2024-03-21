// App.js

import React, {useEffect} from 'react';
import Navigation from './navigation';
import ContextProvider from './context';
import {LogBox} from 'react-native';
import {setupNetInfoListener} from './utils/netInfo';

function App() {
  useEffect(() => {
    const unsubscribe = setupNetInfoListener();

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
