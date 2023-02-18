---
title: Compact and join array
tags: array
author: chalarangelo
cover: racoon
firstSeen: 2022-04-08T05:00:00-04:00
---

Removes falsy values from an array and combines the remaining values into a string.

- Use `Array.prototype.filter()` to filter out falsy values (`false`, `null`, `0`, `""`, `undefined`, and `NaN`).
- Use `Array.prototype.join()` to join the remaining values into a string.

```js
const compactJoin = (arr, delim = ',') => arr.filter(Boolean).join(delim);
```

```js
compactJoin(['a', '', 'b', 'c']); // 'a,b,c'
```
