export interface PokemonSpeciesResponse {
  id: number;
  color: {
    name: string;
  };
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}
