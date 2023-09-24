---
title: Selection sort
type: snippet
language: javascript
tags: [algorithm,array]
author: chalarangelo
cover: yellow-sofa
dateModified: 2021-10-13
---

Sorts an array of numbers, using the selection sort algorithm.

- Use the spread operator (`...`) to clone the original array, `arr`.
- Use a `for` loop to iterate over elements in the array.
- Use `Array.prototype.slice()` and `Array.prototype.reduce()` to find the index of the minimum element in the subarray to the right of the current index. Perform a swap, if necessary.

```js
const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};
```

```js
selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]
```
