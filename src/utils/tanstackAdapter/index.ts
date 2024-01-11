import {useQuery} from '@tanstack/react-query';
import AxiosAdapter from '../axiosAdapter';

export function Query(options: any) {
  return useQuery({
    queryKey: options.key,
    queryFn: () => AxiosAdapter(options),
    enabled: options.enabled,
    meta: {
      errorMessage: 'Failed to fetch data',
    },
  });
}

const Tanstack = {
  Query,
};

export default Tanstack;
