---
title: Chunk iterable
type: snippet
language: javascript
tags: [function,generator,array]
author: chalarangelo
cover: two-doors
dateModified: 2021-03-16
---

Chunks an iterable into smaller arrays of a specified size.

- Use a `for...of` loop over the given iterable, using `Array.prototype.push()` to add each new value to the current `chunk`.
- Use `Array.prototype.length` to check if the current `chunk` is of the desired `size` and `yield` the value if it is.
- Finally, use `Array.prototype.length` to check the final `chunk` and `yield` it if it's non-empty.

```js
const chunkify = function* (itr, size) {
  let chunk = [];
  for (const v of itr) {
    chunk.push(v);
    if (chunk.length === size) {
      yield chunk;
      chunk = [];
    }
  }
  if (chunk.length) yield chunk;
};
```

```js
const x = new Set([1, 2, 1, 3, 4, 1, 2, 5]);
[...chunkify(x, 2)]; // [[1, 2], [3, 4], [5]]
```
