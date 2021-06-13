---
title: findLast
tags: array,beginner
firstSeen: 2018-01-11T13:51:58+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Finds the last element for which the provided function returns a truthy value.

- Use `Array.prototype.filter()` to remove elements for which `fn` returns falsy values.
- Use `Array.prototype.pop()` to get the last element in the filtered array.

```js
const findLast = (arr, fn) => arr.filter(fn).pop();
```

```js
findLast([1, 2, 3, 4], n => n % 2 === 1); // 3
```
