---
title: Array similarity
tags: array,math
expertise: beginner
firstSeen: 2017-12-17T16:41:31+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Returns an array of elements that appear in both arrays.

- Use `Array.prototype.includes()` to determine values that are not part of `values`.
- Use `Array.prototype.filter()` to remove them.

```js
const similarity = (arr, values) => arr.filter(v => values.includes(v));
```

```js
similarity([1, 2, 3], [1, 2, 4]); // [1, 2]
```
