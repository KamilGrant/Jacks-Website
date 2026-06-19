import { useInView as useRawInView } from 'react-intersection-observer';

export function useInView(threshold = 0.2) {
  return useRawInView({ threshold, triggerOnce: true });
}
