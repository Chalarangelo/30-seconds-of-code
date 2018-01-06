### indexOfAll

Returns all indices of `val` in an array. If `val` never occurs, returns `[-1]`.

Use `Array.forEach()` to loop over elements and `Array.push()` to store indices for matching elements.
Return `[-1]` if `length` of the array of indices is `0`, otherwise return the array of indices.

```js
const indexOfAll = (arr, val) => {
  const indices = [];
  arr.forEach((el, i) => el === val && indices.push(i));
  return indices.length ? indices : [-1];
};
```

```js
indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // [-1]
```
