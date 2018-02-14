### none

Returns `true` if no elements in a collection are truthy, `false` otherwise.

Use `!Array.some(Boolean)` to test if any elements in the collection are truthy.

```js
const none = arr => !arr.some(Boolean);
```

```js
none([0,0,0]); // true
```
