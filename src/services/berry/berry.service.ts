import Tanstack from '@/utils/tanstackAdapter';

interface GetListBerryParams {
  limit: number;
  key: string[];
  offset: number;
}

interface GetBerryParams {
  name: string;
  key: string[];
}

interface GetBerryImageParams {
  id: string;
  key: string[];
}

export const getListBerry = ({limit, offset, key}: GetListBerryParams) => {
  const options = {
    url: 'https://pokeapi.co/api/v2/berry',
    method: 'GET',
    key: key,
    params: {limit: limit, offset: offset},
  };

  return Tanstack.Query(options);
};

export const getBerryDetail = ({name, key}: GetBerryParams) => {
  const options = {
    url: `https://pokeapi.co/api/v2/berry/${name}`,
    method: 'GET',
    key: key,
  };

  return Tanstack.Query(options);
};

export const getBerryItemDetail = ({id, key}: GetBerryImageParams) => {
  const options = {
    url: `https://pokeapi.co/api/v2/item/${id}`,
    method: 'GET',
    key: key,
    enabled: !!id,
  };

  return Tanstack.Query(options);
};
