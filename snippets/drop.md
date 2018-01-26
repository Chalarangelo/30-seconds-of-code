### drop

Returns a new array with `n` elements removed from the left.

Use `Array.slice()` to slice the remove the specified number of elements from the left.

```js
const drop = (arr, n = 1) => arr.slice(n);
```

```js
drop([1, 2, 3]); // [2,3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []
```
