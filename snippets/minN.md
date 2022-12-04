---
title: N min elements
tags: array,math
cover: blog_images/digital-nomad-8.jpg
firstSeen: 2018-01-03T05:18:29+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
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
