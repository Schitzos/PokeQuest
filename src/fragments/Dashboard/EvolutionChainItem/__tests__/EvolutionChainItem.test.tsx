import React from 'react';
import {render} from '@testing-library/react-native';
import EvolutionChainItem from '../index';

describe('EvolutionChainItem component', () => {
  const itemProps = {
    id: 1,
    name: 'Bulbasaur',
    weight: 20,
    handleChooseEvolution: jest.fn(),
  };

  test('renders correctly', () => {
    const {getByText} = render(<EvolutionChainItem {...itemProps} />);
    expect(getByText('Bulbasaur')).toBeTruthy();
    expect(getByText('Weight Needed "20"')).toBeTruthy();
  });

  test('matches snapshot', () => {
    const {toJSON} = render(<EvolutionChainItem {...itemProps} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
