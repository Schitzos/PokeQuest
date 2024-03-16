import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import BerryItem from '../index';

describe('BerryItem component', () => {
  const mockHandleSelectBerry = jest.fn();

  test('calls handleSelectBerry function when pressed', () => {
    const {getByText} = render(
      <BerryItem
        name="testBerry"
        handleSelectBerry={mockHandleSelectBerry}
        selectedBerry=""
      />,
    );
    const berry = getByText('testBerry');
    fireEvent.press(berry);
    expect(mockHandleSelectBerry).toHaveBeenCalledWith('testBerry');
  });

  test('matches snapshot', () => {
    const {toJSON} = render(
      <BerryItem
        name="testBerry"
        handleSelectBerry={mockHandleSelectBerry}
        selectedBerry=""
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
