import {TransformedStats, TransformedType} from '@/utils/common/stat';
import {PokemonEvolveData} from './EvolutionPokemon';

export interface SelectedPokemon {
  pokemonId: number;
  pokemonName: string;
  currentExp: number;
  prevExp: number;
  nextExpEvolve: number;
  hungerPoints: number;
  isActive: boolean;
  evolveChain: PokemonEvolveData;
  stats: TransformedStats;
  type: TransformedType;
  prevBerry: null;
}
