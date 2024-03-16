// Evolution.test.tsx

import React from 'react';
import {render} from '@testing-library/react-native';
import Evolution from '../index';
import {Animated} from 'react-native';

jest.mock('@/hooks/usePokemon', () => ({
  usePokemon: () => ({
    pokemon: {
      detail: {id: 25}, // Mocking detail.id for testing purposes
      selected: {pokemonName: 'Pikachu'}, // Mocking selected.pokemonName for testing purposes
    },
  }),
}));

describe('Evolution component', () => {
  test('matches snapshot', () => {
    const viewEvolveAnimate = new Animated.Value(1);
    const viewEvolveSpark = new Animated.Value(1);
    const {toJSON} = render(
      <Evolution
        viewEvolveAnimate={viewEvolveAnimate}
        viewEvolveSpark={viewEvolveSpark}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  // Add more test cases as needed to cover different scenarios and behaviors of the component
});
