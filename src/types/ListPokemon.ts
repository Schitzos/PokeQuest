export interface PokemonItem {
  name: string;
  id: number;
}

export interface PokemonListPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
}

export interface PokemonListsResponse {
  data: {
    pages: PokemonListPage[];
  };
}
