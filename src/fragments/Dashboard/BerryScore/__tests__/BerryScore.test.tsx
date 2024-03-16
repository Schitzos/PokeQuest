// BerryScore.test.tsx

import React from 'react';
import {render} from '@testing-library/react-native';
import BerryScore from '../index';

jest.mock('@/hooks/usePokemon', () => ({
  usePokemon: () => ({
    pokemon: {
      selected: {
        prevExp: 100,
        currentExp: 200,
      },
    },
  }),
}));

jest.mock('@/hooks/useAnimation', () => ({
  useAnimation: () => ({
    animateOpacityToggle: jest.fn(),
  }),
}));

jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

describe('BerryScore component', () => {
  test('matches snapshot', () => {
    const {toJSON} = render(<BerryScore />);
    expect(toJSON()).toMatchSnapshot();
  });

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
});
