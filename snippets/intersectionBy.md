### intersectionBy

Returns a list of elements that exist in both arrays, after applying the provided function to each array element of both.

Create a `Set` by applying `fn` to all elements in `b`, then use `Array.prototype.filter()` on `a` to only keep elements, which produce values contained in `b` when `fn` is applied to them.

```js
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.filter(x => s.has(fn(x)));
};
```

```js
intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
```
