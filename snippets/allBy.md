### allBy

Returns `true` if the provided predicate function returns `true` for all elements in a collection, `false` otherwise.

Use `Array.every()` to test if all elements in the collection return `true` based on `fn`.

```js
const allBy = (arr, fn) => arr.every(fn);
```

```js
allBy([4,2,3], x => x > 1); // true
```
