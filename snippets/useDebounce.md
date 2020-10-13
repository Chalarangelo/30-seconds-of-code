---
title: useDebounce
tags: react, hooks, debounce, intermediate
---

Return set value at a delay by preventing a value set function (`setState`, etc.) from firing too frequently or immediatly on value change.

- This [Hook](https://reactjs.org/docs/hooks-custom.html) replicates the intention of [*debounce*](https://davidwalsh.name/function-debounce) within the React context.
  - Uses `React.useState()` to maintain local state value. Required.
  - Uses `React.useEfect()` to watch for local state changes. Required.
- To use set hook to variable. Demo below.
- Pass a string `value` to the function. Required. If no value is provided the hook will return an empty string value.
- Pass optional `delay` value to function. Set in miliseconds. Default is one second, or `1000`.
- Returns a string `value` at a delay after final value change.

A perfect use case would be to debounce the value of an input prior to firing some function or setting some local state.

```js
import { useState, useEffect } from 'react';

/**
 * Set a value at a debounce.
 *
 * @param {string} value value to set at debounce. Required.
 * @param {int} delay delay time in milliseconds. default one second.
 */
const useDebounce = (value, delay = 1000) => {
  // Bail if no value exists.
  if (! value) { return ''; }

  // Setup local state.
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Update value at a delay.
  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

Set the value to a variable.
```js
// Usage. One and one-half second delay set.
const debouncedValue = useDebounce(valueToDebounce, 1500);
```

Consume value at a delay.
```js
// Will return changed value after one and a half seconds of final change.
console.log(debouncedValue);
```
