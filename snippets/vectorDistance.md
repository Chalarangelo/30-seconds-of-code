### vectorDistance

Returns the distance between two vectors.

Use `Array.prototype.reduce()`, `Math.pow()` and `Math.sqrt()` to calculate the Euclidean distance between two vectors.

```js
const vectorDistance = (...coords) => {
  let pointLength = Math.trunc(coords.length / 2);
  let sum = coords.slice(0, pointLength).reduce((acc, val, i) => acc + (Math.pow(val - coords[pointLength + i], 2)), 0);
  return Math.sqrt(sum);
};
```

```js
vectorDistance(10, 0, 5, 20, 0, 10); // 11.180339887498949
```
