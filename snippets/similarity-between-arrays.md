### Similarity between arrays

Use `filter()` to remove values that are not part of `values`, determined using `includes()`.

```js
const difference = (arr, values) => arr.filter(v => values.includes(v));
```
