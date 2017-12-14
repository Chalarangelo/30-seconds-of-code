### Concat

Use `Array.concat()` to concatenate and array with any additional arrays and/or values, specified in `args`.

```js
const ArrayConcat = (arr, ...args) => arr.concat(...args); 
// ArrayConcat([1], [1, 2, 3, [4]]) -> [1, 2, 3, [4]]
```
