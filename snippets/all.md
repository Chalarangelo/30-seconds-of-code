### all

Returns `true` if all elements in a collection are truthy, `false` otherwise.

Use `Array.every(Boolean)` to test if all elements in the collection are truthy.

```js
const all = arr => arr.every(Boolean);
```

```js
all([1,2,3]); // true
```
