### memoize

Returns the memoized (cached) function.

Create an empty cache using by instantiating a new `Map` object.
Return a function which takes a single argument to be supplied to the memoized function by first checking if the function's output for that specific input value is already cached, or store and return it if not.
Allow access to the `cache` by setting it as a property on the returned function.

```js
const memoize = fn => {
  const cache = new Map();
  const cached = val => cache.get(val) || (cache.set(val, fn(val))) && cache.get(val);
  cached.cache = cache;
  return cached;
};
```

```js
// See the `anagrams` snippet.
const anagramsCached = memoize(anagrams);
anagramsCached('javascript'); // takes a long time
anagramsCached('javascript'); // returns virtually instantly since it's now cached
console.log(anagramsCached.cache); // Map
```
