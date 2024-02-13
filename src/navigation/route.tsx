import React from 'react';
import {Suspensed} from './suspense';

export default {
  PreloadScreen: Suspensed(React.lazy(() => import('../screen/Preload'))),
  HomeScreen: Suspensed(React.lazy(() => import('../screen/Home'))),
  PokemonDetailScreen: Suspensed(
    React.lazy(() => import('../screen/PokemonDetail')),
  ),
  DashboardScreen: Suspensed(React.lazy(() => import('../screen/Dashboard'))),
};
