import React from 'react';
import {Suspensed} from './suspense';

export default {
  DashboardScreen: Suspensed(React.lazy(() => import('../screen/Dashboard'))),
  PokemonDetailScreen: Suspensed(
    React.lazy(() => import('../screen/PokemonDetail')),
  ),
};
