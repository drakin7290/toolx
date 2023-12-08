import { useMemo } from 'react';
import { useSubscription } from 'use-subscription';

// import { canUseDOM } from '~/utils';

export const useMediaQuery = (query) => {
  const mediaQueryList = useMemo(() => window.matchMedia(query), [query]);

  const subscription = useMemo(
    () => ({
      getCurrentValue: () => mediaQueryList?.matches ?? false,
      subscribe: (callback) => {
        mediaQueryList?.addEventListener('change', callback);
        return () => mediaQueryList?.removeEventListener('change', callback);
      },
    }),
    [mediaQueryList]
  );

  const matches = useSubscription(subscription);
  return matches;
};
