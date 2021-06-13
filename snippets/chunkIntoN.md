---
title: chunkIntoN
tags: array,intermediate
firstSeen: 2020-05-04T13:00:46+03:00
lastUpdated: 2020-11-03T21:46:13+02:00
---

Chunks an array into `n` smaller arrays.

- Use `Math.ceil()` and `Array.prototype.length` to get the size of each chunk.
- Use `Array.from()` to create a new array of size `n`.
- Use `Array.prototype.slice()` to map each element of the new array to a chunk the length of `size`.
- If the original array can't be split evenly, the final chunk will contain the remaining elements.

```js
const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}
```

```js
chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]
```
