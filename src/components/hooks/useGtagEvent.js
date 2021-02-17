import { useCallback } from 'react';
import { useShellState } from 'state/shell';

/**
 * A hook that handles gtag-enabled event tracking gracefully.
 */
const useGtagEvent = name => {
  const { acceptsCookies } = useShellState();
  const canSendEvent =
    typeof window !== 'undefined' && typeof gtag === `function`;

  return useCallback(
    params => {
      if (acceptsCookies && canSendEvent) window.gtag('event', name, params);
      else if (process.env.NODE_ENV === 'development')
        console.log('event', name, params);
    },
    [acceptsCookies]
  );
};

export default useGtagEvent;
