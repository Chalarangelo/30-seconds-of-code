---
title: Array symmetric difference
type: snippet
language: javascript
tags: [array,math]
cover: rocky-mountains-2
dateModified: 2020-10-22
---

Returns the symmetric difference between two arrays, without filtering out duplicate values.

- Create a `Set` from each array to get the unique values of each one.
- Use `Array.prototype.filter()` on each of them to only keep values not contained in the other.

```js
const symmetricDifference = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
};
```

```js
symmetricDifference([1, 2, 3], [1, 2, 4]); // [3, 4]
symmetricDifference([1, 2, 2], [1, 3, 1]); // [2, 2, 3]
```
