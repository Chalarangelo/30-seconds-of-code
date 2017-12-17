### Array sum

Use `Array.reduce()` to sum an array of integers.

```js
const sumArray = arr => arr.reduce( (i, j) => i + j, 0 );
sumArray([1, 2, 3]); -> 6
```