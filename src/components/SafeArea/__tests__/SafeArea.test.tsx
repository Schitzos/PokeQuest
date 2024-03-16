import React from 'react';
import {render} from '@testing-library/react-native';
import SafeArea from '../index';
import '@testing-library/jest-dom';

describe('SafeArea component', () => {
  test('matches snapshot with default props', () => {
    const {toJSON} = render(<SafeArea>Child Component</SafeArea>);
    expect(toJSON()).toMatchSnapshot();
  });

  test('matches snapshot with custom color', () => {
    const {toJSON} = render(<SafeArea color="red">Child Component</SafeArea>);
    expect(toJSON()).toMatchSnapshot();
  });
});
