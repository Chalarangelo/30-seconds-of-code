### Concat

Creates a new array concatenating array with any additional arrays and/or values `args` using `Array.concat()`.

```js
const ArrayConcat = (arr, ...args) => arr.concat(...args); 
// ArrayConcat([1], [1, 2, 3, [4]]) -> [1, 2, 3, [4]]
```
