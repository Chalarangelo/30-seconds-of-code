### indexOfAll

Returns all indices of `val` in an array. If `val` never occurs, returns `[]`.

Use `Array.reduce()` to loop over elements and `[...acc, index]` to store indices for matching elements.
Return the last `acc`.

```js
const indexOfAll = (arr, val) => arr.reduce((acc, el, index) => el === val ? [...acc, index] : acc, []);
```

```js
indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
```
