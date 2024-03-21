import AsyncStorage from '@react-native-async-storage/async-storage';
import {POKEMON_STATE_KEY} from '..';

jest.mock('@react-native-async-storage/async-storage');

describe('PokemonContextProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set and retrieve pokemon data from AsyncStorage', async () => {
    const mockPokemon = {
      detail: {},
      species: {},
      selected: {},
    };

    AsyncStorage.getItem(JSON.stringify(mockPokemon));
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(
      JSON.stringify(mockPokemon),
    );
  });

  test('should set data in AsyncStorage when pokemon state changes', async () => {
    const mockPokemon = {
      detail: {},
      species: {},
      selected: {},
    };

    AsyncStorage.setItem(POKEMON_STATE_KEY, JSON.stringify(mockPokemon));
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      POKEMON_STATE_KEY,
      JSON.stringify(mockPokemon),
    );
  });
});
