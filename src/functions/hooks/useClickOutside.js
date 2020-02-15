import { useEffect } from 'react';

/* istanbul ignore next */
/**
 * A hook that handles the event of clicking outside of the wrapped component.
 */
const useClickOutside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target))
      callback();

  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useClickOutside;
