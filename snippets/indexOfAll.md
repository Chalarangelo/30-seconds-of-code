### indexOfAll

Returns all indices of `val` in an array. If `val` never occurs, returns `[]`.

Use `Array.forEach()` to loop over elements and `Array.push()` to store indices for matching elements.
Return the array of indices.

```js
const indexOfAll = (arr, val) => {
  const indices = [];
  arr.forEach((el, i) => el === val && indices.push(i));
  return indices;
};
```

```js
indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
```
