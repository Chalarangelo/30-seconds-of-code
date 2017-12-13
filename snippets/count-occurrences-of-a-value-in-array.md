### Count occurrences of a value in array

Use `.filter()` to filter out values that don't exist inside the array.

```js
const countOccurrences = (arr, val) => arr.filter(v => v === val).length;
// countOccurrences([1,1,2,1,2,3], 1) -> 3
```
