import { useCallback } from 'react';
import { useShellState } from 'state/shell';

/**
 * A hook that handles gtag-enabled event tracking gracefully.
 */
const useGtagEvent = name => {
  const { isBot } = useShellState();
  const canSendEvent =
    typeof window !== 'undefined' && !isBot && typeof gtag === `function`;

  return useCallback(params => {
    if (canSendEvent && process.env.NODE_ENV !== 'development')
      window.gtag('event', name, params);
    else if (process.env.NODE_ENV === 'development')
      console.log('event', name, params);
  }, []);
};

export default useGtagEvent;
