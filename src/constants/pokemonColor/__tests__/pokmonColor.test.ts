// Import the object to be tested

import {pokemonColor} from '..';

// Mock the image assets
jest.mock('@assets/images/black-background.png', () => 'black-image');
jest.mock('@assets/images/blue-background.png', () => 'blue-image');
jest.mock('@assets/images/brown-background.png', () => 'brown-image');
jest.mock('@assets/images/white-background.png', () => 'white-image');
jest.mock('@assets/images/green-background.png', () => 'green-image');
jest.mock('@assets/images/pink-background.png', () => 'pink-image');
jest.mock('@assets/images/purple-background.png', () => 'purple-image');
jest.mock('@assets/images/yellow-background.png', () => 'yellow-image');

describe('pokemonColor', () => {
  test('each color key should correspond to the correct image asset path', () => {
    expect(pokemonColor).toEqual({
      black: 'black-image',
      blue: 'blue-image',
      brown: 'brown-image',
      gray: 'white-image', // Assuming gray is a typo and should be white
      green: 'green-image',
      pink: 'pink-image',
      purple: 'purple-image',
      red: 'pink-image', // Assuming red is a typo and should be pink
      white: 'white-image',
      yellow: 'yellow-image',
    });
  });
});
