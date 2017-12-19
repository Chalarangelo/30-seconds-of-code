### Array dropRight

Returns a new array with `n` elements removed from the right

Check if `n` is shorter than the given array and use `Array.slice()` to slice it accordingly or return an empty array.

```js
const dropRight = (arr, n = 1) => n < arr.length ? arr.slice(0, arr.length - n) : []
//dropRight([1,2,3]) -> [1,2]
//dropRight([1,2,3], 2) -> [1]
//dropRight([1,2,3], 42) -> []
```
