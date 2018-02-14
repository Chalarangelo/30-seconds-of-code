### noneBy

Returns `true` if the provided predicate function returns `false` for all elements in a collection, `false` otherwise.

Use `Array.some()` to test if any elements in the collection return `true` based on `fn`.

```js
const noneBy = (arr, fn) => !arr.some(fn);
```

```js
noneBy([0,1,3,0], x => x == 2); // true
```
