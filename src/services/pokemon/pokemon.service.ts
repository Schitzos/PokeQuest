import AxiosAdapter from '@/utils/axiosAdapter';
import Tanstack from '@utils/tanstackAdapter';

interface GetListPokemonParams {
  limit: number;
  key: string[];
  offset: number;
  search?: string | number;
}

interface SearchPokemonParams {
  key: string[];
  search: string | number;
}

interface GetSpeciesPokemonParams {
  id: number | string;
  key: string[];
}

interface GetSpeciesPokemonAltParams {
  id: number;
}

interface GetDetailPokemonParams {
  id: string;
  key: string[];
}

export const getListPokemon = ({limit, offset, key}: GetListPokemonParams) => {
  const options = {
    url: `${process.env.BASE_URL}/pokemon`,
    method: 'GET',
    key: key,
    params: {limit: limit, offset: offset},
  };

  return Tanstack.InfiniteQuery(options);
};

export const searchPokemon = ({key, search}: SearchPokemonParams) => {
  const options = {
    url: `${process.env.BASE_URL}/pokemon/${search}`,
    method: 'GET',
    key: key,
    enabled: !!search,
  };

  return Tanstack.Query(options);
};

export const getSpeciesPokemonAlt = async ({
  id,
}: GetSpeciesPokemonAltParams) => {
  const options = {
    url: `${process.env.BASE_URL}/pokemon-species/${id}`,
    method: 'GET',
  };

  return await AxiosAdapter(options);
};

export const getSpeciesPokemon = ({id, key}: GetSpeciesPokemonParams) => {
  const options = {
    url: `${process.env.BASE_URL}/pokemon-species/${id}`,
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

export const getDetailPokemonAlt = async ({id}: GetSpeciesPokemonAltParams) => {
  const options = {
    url: `${process.env.BASE_URL}/pokemon/${id}`,
    method: 'GET',
  };

  return await AxiosAdapter(options);
};

export const getEvolveChain = ({id, key}: GetDetailPokemonParams) => {
  const options = {
    url: `${process.env.BASE_URL}/evolution-chain/${id}`,
    method: 'GET',
    key: key,
    enabled: !!id,
  };

  return Tanstack.Query(options);
};
