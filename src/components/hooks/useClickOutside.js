import { useEffect } from 'react';

/**
 * A hook that handles the event of clicking outside of the wrapped component.
 */
const useClickOutside = (ref, callback) => {
  const handleClick = e => {
    /* istanbul ignore else */
    if (ref.current && !ref.current.contains(e.target)) callback();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useClickOutside;
