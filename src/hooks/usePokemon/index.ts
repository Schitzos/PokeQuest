import {useContext} from 'react';
import {PokemonContext} from '@/context/PokemonContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function usePokemon() {
  const usePokemonContext = () => {
    const contextValue = useContext(PokemonContext);
    if (contextValue === null) {
      return {
        pokemon: null,
        setPokemon: () => {},
      };
    }

    return contextValue;
  };
  const {pokemon, setPokemon} = usePokemonContext();

  const removePokemon = () => {
    AsyncStorage.clear();
  };

  return {
    pokemon,
    setPokemon,
    removePokemon,
  };
}
