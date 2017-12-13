### Shuffle array values

Create an array of random values by using `Array.map()` and `Math.random()`.
Use `Array.sort()` to sort the elements of the original array based on the random values.

```js
const shuffle = arr => {
  let r = arr.map(Math.random);
  return arr.sort((a, b) => r[a] - r[b]);
};
// shuffle([1,2,3]) -> [2, 1, 3]
```
