### Array concatenation

Use `Array.concat()` to concatenate and array with any additional arrays and/or values, specified in `args`.

```js
const arrayConcat = (arr, ...args) => arr.concat(...args);
// arrayConcat([1], [1, 2, 3, [4]]) -> [1, 1, 2, 3, [4]]
```
