### memoize

Returns the memoized (cached) function.

Use `Object.create(null)` to create an empty object without Object.prototype
(so that those properties are not resolved if the input value is something like 'hasOwnProperty').
Return a function which takes a single argument to be supplied to the memoized function
by first checking if the function's output for that specific input value is already cached, or
store and return it if not.

```js
const memoize = fn => {
  const cache = Object.create(null);
  return value => cache[value] || (cache[value] = fn(value));
};
```

```js
// See the `anagrams` snippet.
const anagramsCached = memoize(anagrams);
anagramsCached('javascript'); // takes a long time
anagramsCached('javascript'); // returns virtually instantly since it's now cached
```
