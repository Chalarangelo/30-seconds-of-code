### symmetricDifference

Returns the symmetric difference between two arrays.

Create a `Set` from each array, then use `Array.filter()` on each of them to only keep values not contained in the other.

```js
const symmetricDifference = (a, b) => [
  ...new Set([...a.filter(v => !b.includes(v)), ...b.filter(v => !a.includes(v))])
];
```

```js
symmetricDifference([1, 2, 3], [1, 2, 4]); // [3,4]
```
