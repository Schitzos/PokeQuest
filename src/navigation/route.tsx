import React from 'react';
import {Suspensed} from './suspense';

export default {
  HomeScreen: Suspensed(React.lazy(() => import('../screen/Home'))),
  PokemonDetailScreen: Suspensed(
    React.lazy(() => import('../screen/PokemonDetail')),
  ),
};
