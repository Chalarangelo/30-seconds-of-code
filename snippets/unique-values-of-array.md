### Unique values of array

use ES6 `Set` and the `...rest` operator to discard all duplicated values.

```js
const unique = c => [...new Set(c)]
// unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]
```

Use `Array.filter` for an array containing only the unique values

```js
const unique = c => c.filter(i => c.indexOf(i) === c.lastIndexOf(i))
// unique([1,2,2,3,4,4,5]) -> [1,3,5]
```




