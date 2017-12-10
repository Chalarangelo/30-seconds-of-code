### Difference between arrays

Use `filter()` to remove values that are part of `values`, determined using `indexOf()`.

```js
var difference = (arr, values) =>
  arr.filter(v => values.indexOf(v) === -1);
```
