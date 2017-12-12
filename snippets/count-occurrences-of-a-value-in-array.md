### Count occurrences of a value in array

Use `filter()` to create an array containing only the items with the specified value, count them using `length`.

```js
var countOccurrences = (arr, value) => arr.filter(v => v === value).length;
```

Use reduce() to increment a counter each time you encounter the specific value; does not create new array like filter().

```js
var countOccurrences = (arr, value) => arr.reduce((a, v) => v===value ? a + 1 : a + 0, 0);
```
