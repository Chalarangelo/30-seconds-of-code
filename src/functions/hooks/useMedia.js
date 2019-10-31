import { useState, useEffect } from 'react';

/**
 * Given an array of queries and an array of values to use on each of them
 * matching, this hook runs the media queries and returns the result.
 * Also takes a default value.
 */
const useMedia = (queries, values, defaultValue) => {
  if(typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return defaultValue;

  const mediaQueryLists = queries.map(q => window.matchMedia(q));

  const getValue = () => {
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach(mql => mql.addListener(handler));
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
  }, []);

  return value;
};

export default useMedia;
