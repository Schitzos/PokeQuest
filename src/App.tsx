import * as React from 'react';
import Navigation from './navigation';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClientConfig} from './config/tanstack';

const queryClient = queryClientConfig;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}

export default App;
