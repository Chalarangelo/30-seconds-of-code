### maxBy

Returns the maximum value of an array, after mapping each element to a value using the provided function.

Use `Array.map()` to map each element to the value returned by `fn`, `Math.max()` to get the maximum value.

```js
const maxBy = (arr, fn) => Math.max(...arr.map(fn));
```

```js
maxBy([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], o => o.n);  // 8
```
