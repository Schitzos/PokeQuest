import {QueryCache, QueryClient} from '@tanstack/react-query';
import crashlytics from '@react-native-firebase/crashlytics';

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta && query.meta.errorMessage) {
        crashlytics().recordError(error);
        console.log(`error ${query.meta.errorMessage} ${error}`);
      }
    },
  }),
});
