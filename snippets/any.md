### any

Returns `true` if at least one element in a collection is truthy, `false` otherwise.

Use `Array.some(Boolean)` to test if any elements in the collection are truthy.

```js
const any = arr => arr.some(Boolean);
```

```js
any([0, 0, 1, 0]); // true
```
