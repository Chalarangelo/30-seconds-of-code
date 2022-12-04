---
title: N max elements
tags: array,math
cover: blog_images/digital-nomad-15.jpg
firstSeen: 2018-01-03T05:18:29+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
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
