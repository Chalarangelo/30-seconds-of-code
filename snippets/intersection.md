### intersection

Returns a list of elements that exist in both arrays.

Create a `Set` from `b`, then use `Array.prototype.filter()` on `a` to only keep values contained in `b`.

```js
const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};
```

```js
intersection([1, 2, 3], [4, 3, 2]); // [2, 3]
```
