### anyBy

Returns `true` if the provided predicate function returns `true` for at least one element in a collection, `false` otherwise.

Use `Array.some()` to test if any elements in the collection return `true` based on `fn`.

```js
const anyBy = (arr, fn) => arr.some(fn);
```

```js
anyBy([0, 1, 2, 0], x => x >= 2); // true
```
