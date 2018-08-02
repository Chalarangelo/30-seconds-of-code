### indexOfAll

Returns all indices of `val` in an array. If `val` never occurs, returns `[]`.

Use `Array.reduce()` to loop over elements and store indices for matching elements.
Return the array of indices.

```js
const indexOfAll = (arr, val) => (arr, val) => arr.reduce((acc, el, i) => el === val ? [...acc, i] : acc, []);
```

```js
indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
```
