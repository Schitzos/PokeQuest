import {QueryCache, QueryClient} from '@tanstack/react-query';

export const queryClientConfig = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta && query.meta.errorMessage) {
        console.log(`error ${query.meta.errorMessage} ${error}`);
      }
    },
  }),
});
