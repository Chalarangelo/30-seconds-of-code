### minBy

Returns the minimum value of an array, after mapping each element to a value using the provided function.

Use `Array.map()` to map each element to the value returned by `fn`, `Math.min()` to get the maximum value.

```js
const minBy = (arr, fn) => Math.min(...arr.map(fn));
```

```js
minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 8
```
