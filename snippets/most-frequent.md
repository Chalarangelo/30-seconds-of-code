---
title: Most frequent element in array
type: snippet
tags: [array]
author: chalarangelo
cover: clock
dateModified: 2020-09-15T16:28:04+03:00
---

Returns the most frequent element in an array.

- Use `Array.prototype.reduce()` to map unique values to an object's keys, adding to existing keys every time the same value is encountered.
- Use `Object.entries()` on the result in combination with `Array.prototype.reduce()` to get the most frequent value in the array.

```js
const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];
```

```js
mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'
```
