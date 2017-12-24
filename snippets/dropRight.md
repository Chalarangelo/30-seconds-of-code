### dropRight

Returns a new array with `n` elements removed from the right.

Use `Array.slice()` to slice the remove the specified number of elements from the right.

```js
const dropRight = (arr, n = 1) => arr.slice(0, -n);
//dropRight([1,2,3]) -> [1,2]
//dropRight([1,2,3], 2) -> [1]
//dropRight([1,2,3], 42) -> []
```
