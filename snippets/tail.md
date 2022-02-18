---
title: Array tail
tags: array,beginner
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Returns all elements in an array except for the first one.

- Use `Array.prototype.slice()`to return the array without the first element if `Array.prototype.length` is more than `1`.
- Otherwise, return the whole array.

```js
const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);
```

```js
tail([1, 2, 3]); // [2, 3]
tail([1]); // [1]
```
