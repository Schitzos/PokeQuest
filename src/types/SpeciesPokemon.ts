export interface PokemonSpeciesResponse {
  id: number;
  name: string;
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
  is_legendary: boolean;
}
