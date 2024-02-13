import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';

export interface PokemonContextType {
  pokemon: any;
  setPokemon: (newData: any) => void;
}

interface PokemonProviderProps {
  children: React.ReactNode;
}

export const PokemonContext = createContext<PokemonContextType | null>(null);
export const POKEMON_STATE_KEY = 'pokemon-data';

export default function AuthContextProvider({children}: PokemonProviderProps) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (pokemon !== null) {
      AsyncStorage.setItem(POKEMON_STATE_KEY, JSON.stringify(pokemon));
    }
  }, [pokemon]);

  useEffect(() => {
    AsyncStorage.getItem(POKEMON_STATE_KEY).then((value: string | null) => {
      if (value) {
        const parse = JSON.parse(value || '');
        setPokemon(parse);
      }
    });
  }, []);

  return (
    <PokemonContext.Provider value={{pokemon, setPokemon}}>
      {children}
    </PokemonContext.Provider>
  );
}
