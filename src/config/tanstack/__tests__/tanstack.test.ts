import {QueryCache, QueryClient} from '@tanstack/react-query';
import crashlytics from '@react-native-firebase/crashlytics';
import {queryClientConfig} from '..';

jest.mock('@react-native-firebase/crashlytics', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('queryClientConfig', () => {
  test('default options should be set correctly', () => {
    expect(queryClientConfig.getDefaultOptions()).toEqual({
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    });
  });
});
