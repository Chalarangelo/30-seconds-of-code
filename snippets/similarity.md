### similarity

Returns an array of elements that appear in both arrays.

Use `Array.filter()` to remove values that are not part of `values`, determined using `Array.includes()`.

```js
const similarity = (arr, values) => arr.filter(v => values.includes(v));
```

```js
similarity([1, 2, 3], [1, 2, 4]); // [1, 2]
```
