import Tanstack from '@/utils/tanstackAdapter';

interface GetListBerryParams {
  limit: number;
  key: string[];
}

interface GetBerryParams {
  name: string;
  key: string[];
}

interface GetBerryImageParams {
  name: string;
  key: string[];
}

export const getListBerry = ({key, limit}: GetListBerryParams) => {
  const options = {
    url: 'https://pokeapi.co/api/v2/berry',
    method: 'GET',
    key: key,
    params: {limit: limit},
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

export const getBerryItemDetail = ({name, key}: GetBerryImageParams) => {
  const options = {
    url: `https://pokeapi.co/api/v2/item/${name}`,
    method: 'GET',
    key: key,
    enabled: !!name,
  };

  return Tanstack.Query(options);
};
