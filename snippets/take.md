### Take

Use `.slice()` to create a slice of the array with n elements taken from the beginning.

```js
const take = (arr, n) => n === undefined ? arr.slice(0, 1) : arr.slice(0, n);

// take([1, 2, 3], 5) -> [1, 2, 3]
// take([1, 2, 3], 0) -> []
```
