---
title: Initialize mapped array
type: snippet
language: javascript
tags: [array]
cover: yellow-shoes
dateModified: 2023-06-13
---

Initializes and fills an array with the specified values, using a mapping function.

- Use the `Array()` constructor to create an array of the desired length.
- Use `Array.prototype.fill()` to fill it with `null` values.
- Use `Array.prototype.map()` to fill it with the desired values, using the provided function, `mapFn`.
- Omit the second argument, `mapFn`, to map each element to its index.

```js
const initializeMappedArray = (n, mapFn = (_, i) => i) =>
  Array(n).fill(null).map(mapFn);
```

```js
initializeMappedArray(5); // [0, 1, 2, 3, 4]
initializeMappedArray(5, i => `item ${i + 1}`);
// ['item 1', 'item 2', 'item 3', 'item 4', 'item 5']
```
