import React from 'react';
import Navigation from './navigation';
import ContextProvider from './context';

function App() {
  return (
    <ContextProvider>
      <Navigation />
    </ContextProvider>
  );
}

export default App;
