import perf from '@react-native-firebase/perf';

export default function ScreenPerformanceTrace(key: string) {
  return perf().newTrace(key);
}
