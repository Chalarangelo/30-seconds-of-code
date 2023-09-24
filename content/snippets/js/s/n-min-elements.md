---
title: N min elements
type: snippet
language: javascript
tags: [math]
cover: digital-nomad-8
dateModified: 2020-10-21
---

Returns the `n` minimum elements from the provided array.

- Use `Array.prototype.sort()` combined with the spread operator (`...`) to create a shallow clone of the array and sort it in ascending order.
- Use `Array.prototype.slice()` to get the specified number of elements.
- Omit the second argument, `n`, to get a one-element array.
- If `n` is greater than or equal to the provided array's length, then return the original array (sorted in ascending order).

```js
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
```

```js
minN([1, 2, 3]); // [1]
minN([1, 2, 3], 2); // [1, 2]
```
