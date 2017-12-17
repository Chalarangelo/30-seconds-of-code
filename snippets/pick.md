### pick

Picks the key-value pairs corresponding to the given keys from an object.

Use `Array.reduce()` to convert the filtered/picked keys back to a object with the corresponding key-value pair if the key exist in the obj.

```js
const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
// pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -> { 'a': 1, 'c': 3 }
```
