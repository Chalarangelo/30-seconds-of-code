---
title: initial
tags: array,beginner
firstSeen: 2017-12-17T16:41:31+02:00
lastUpdated: 2020-11-03T21:46:13+02:00
---

Returns all the elements of an array except the last one.

- Use `Array.prototype.slice()` to return all but the last element of the array.

```js
const initial = arr => arr.slice(0, -1);
```

```js
initial([1, 2, 3]); // [1, 2]
```
