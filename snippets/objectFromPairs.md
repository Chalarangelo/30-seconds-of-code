### objectFromPairs

Creates an object from the given key-value pairs.

Use `Array.reduce()` to create and combine key-value pairs.

```js
const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});
```

```js
objectFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}
```
