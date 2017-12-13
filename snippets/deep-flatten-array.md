### Deep flatten array

Use recursion.
Use `Array.reduce()` to get all elements that are not arrays, flatten each element that is an array.

```js
const deepFlatten = arr =>
  arr.reduce( (a, v) => a.concat( Array.isArray(v) ? deepFlatten(v) : v ), []);
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
```
