### normalizeVector

Returns a list consisting of a 3-element array representing a vector that is the normalized version of another vector.

Use `Math.sqrt()` to calculate `magnitude`, divide components by `magnitude`.

```js
const normalize = ([x, y, z]) => {
  magnitude = Math.sqrt(x*x + y*y + z*z);
  return [x/magnitude, y/magnitude, z/magnitude];
}
```

```js
normalize([2, 2, 1]); // [0.8164965809277,0.4082482904638,0.4082482904638]
normalize([10, 0, 0]); // [10, 0, 0]
```
