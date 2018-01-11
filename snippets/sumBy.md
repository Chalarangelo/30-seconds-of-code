### sumBy

Returns the sum of an array, after mapping each element to a value using the provided function.

Use `Array.map()` to map each element to the value returned by `fn`, `Array.reduce()` to add each value to an accumulator, initialized with a value of `0`.

```js
const sumBy = (arr, fn) => arr.map(fn).reduce((acc, val) => acc + val, 0);
```

```js
sumBy([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], o => o.n); // 20
```
