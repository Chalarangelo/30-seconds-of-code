### Deep flatten array

Use recursion.
Use `[].concat()` and the spread operator `...` to flatten an array, and recursively flatten each element that is an array.

```js
const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v));
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
```
