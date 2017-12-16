### Filter out non-unique values in an array

Use `Array.filter()` for an array containing only the unique values.

```js
const filterNonUnique = arr => arr.filter((o, i) => arr.indexOf(i) === i);
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]
```
