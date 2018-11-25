### differenceBy

Returns the difference between two arrays, after applying the provided function to each array element of both.

Create a `Set` by applying `fn` to each element in `b`, then use `Array.prototype.filter()` in combination with `fn` on `a` to only keep values not contained in the previously created set.

```js
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.filter(x => !s.has(fn(x)));
};
```

```js
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [ { x: 2 } ]
```
