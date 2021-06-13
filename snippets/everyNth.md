---
title: everyNth
tags: array,beginner
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-19T18:51:03+03:00
---

Returns every `nth` element in an array.

- Use `Array.prototype.filter()` to create a new array that contains every `nth` element of a given array.

```js
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
```

```js
everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]
```
