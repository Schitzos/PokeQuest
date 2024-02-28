export type RootStackParamList = {
  Preload: undefined;
  Home: undefined;
  PokemonDetail: {
    id: number;
    tab?: number | undefined;
  };
  Dashboard: undefined;
  PetNavigator: undefined;
  Pet: {action: string};
  Feed: {action: string};
  Journey: undefined;
  Profile: {action: string};
};
