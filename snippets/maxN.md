---
title: maxN
tags: array,math,intermediate
---

Returns the `n` maximum elements from the provided array.

- Use `Array.prototype.sort()` combined with the spread operator (`...`) to create a shallow clone of the array and sort it in descending order.
- Use `Array.prototype.slice()` to get the specified number of elements.
- Omit the second argument, `n`, to get a one-element array.
- If `n` is greater than or equal to the provided array's length, then return the original array (sorted in descending order).

```js
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);
```

```js
maxN([1, 2, 3]); // [3]
maxN([1, 2, 3], 2); // [3, 2]
```
