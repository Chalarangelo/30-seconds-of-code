### Count occurrences of a value in array

Use `filter()` to create an array containing only the items with the specified value, count them using `length`.

```js
var countOccurrences = (arr, value) => arr.filter(v => v === value).length;
```
