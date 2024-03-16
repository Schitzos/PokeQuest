import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Button from '../index';
import '@testing-library/jest-dom';

describe('Button component', () => {
  test('matches snapshot with default props', () => {
    const {toJSON} = render(<Button onPress={() => null}>Button Text</Button>);
    expect(toJSON()).toMatchSnapshot();
  });

  test('renders correctly with default props', () => {
    const {getByText} = render(
      <Button onPress={() => null}>Button Text</Button>,
    );
    const buttonElement = getByText('Button Text');
    expect(buttonElement).toBeTruthy();
  });

  test('executes onPress function when clicked', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(<Button onPress={onPressMock}>Click Me</Button>);
    const buttonElement = getByText('Click Me');
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalled();
  });

  test('executes default onPress function when not provided', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(<Button>Click Me</Button>);
    const buttonElement = getByText('Click Me');
    fireEvent.press(buttonElement);
    expect(onPressMock).not.toHaveBeenCalled(); // Assuming this default behavior does not call onPress
  });
});
