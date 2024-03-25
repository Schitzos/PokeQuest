/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, {AxiosRequestConfig} from 'axios';
import perf from '@react-native-firebase/perf';

export default function AxiosAdapter(options: AxiosRequestConfig) {
  // Create a new instance of axios
  const instance = axios.create();

  instance.interceptors.request.use(async function (config) {
    try {
      const {url, method} = config;
      const httpMethod = method && method.toUpperCase(); // Ensure method is uppercase
      // @ts-ignore
      const httpMetric = perf().newHttpMetric(url, httpMethod);
      // @ts-ignore
      config.metadata = {httpMetric};
      await httpMetric.start();
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  });

  // Add response interceptor
  instance.interceptors.response.use(
    async function (response) {
      try {
        // @ts-ignore
        const {httpMetric} = response.config.metadata;
        httpMetric.setHttpResponseCode(response.status);
        httpMetric.setResponseContentType(response.headers['content-type']);
        await httpMetric.stop();
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async function (error) {
      try {
        // Request failed, e.g., HTTP code 500

        const {httpMetric} = error.config.metadata;

        // add any extra metric attributes if needed
        // httpMetric.putAttribute('userId', '12345678');

        httpMetric.setHttpResponseCode(error.response.status);
        httpMetric.setResponseContentType(
          error.response.headers['content-type'],
        );
        await httpMetric.stop();
        // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
      } catch (error) {
        return Promise.reject(error);
      }
    },
  );

  // Return a promise
  return new Promise((resolve, reject) => {
    // Use the axios instance to make the request
    instance(options)
      .then(res => {
        resolve(res.data); // Resolve with the response data
      })
      .catch(err => {
        reject(err); // Reject with the error
      });
  });
}
