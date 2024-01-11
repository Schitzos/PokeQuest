import Tanstack from '@utils/tanstackAdapter';

interface GetListPokemonParams {
  limit: number;
  key: string[];
}

interface GetSpeciesPokemonParams {
  name: string;
  key: string[];
}

interface GetDetailPokemonParams {
  id: string;
  key: string[];
}

export const getListPokemon = ({limit, key}: GetListPokemonParams) => {
  const options = {
    url: `${process.env.BASE_URL}/pokemon`,
    method: 'GET',
    key: key,
    params: {limit: limit},
  };

  return Tanstack.Query(options);
};

export const getSpeciesPokemon = ({name, key}: GetSpeciesPokemonParams) => {
  const options = {
    url: `${process.env.BASE_URL}/pokemon-species/${name}`,
    method: 'GET',
    key: key,
  };

  return Tanstack.Query(options);
};

export const getDetailPokemon = ({id, key}: GetDetailPokemonParams) => {
  const options = {
    url: `${process.env.BASE_URL}/pokemon/${id}`,
    method: 'GET',
    key: key,
    enabled: !!id,
  };

  return Tanstack.Query(options);
};
