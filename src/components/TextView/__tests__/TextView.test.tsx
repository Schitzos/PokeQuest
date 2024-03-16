import React from 'react';
import {render} from '@testing-library/react-native';
import TextView from '../index';
import '@testing-library/jest-dom';

describe('TextView component', () => {
  test('renders correctly with default props', () => {
    const {getByText} = render(<TextView>Test Text</TextView>);
    const textElement = getByText('Test Text');
    expect(textElement).toBeTruthy();
  });
});
