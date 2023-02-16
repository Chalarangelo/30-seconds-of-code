---
title: Unique values in array
tags: array
cover: architectural
firstSeen: 2018-01-17T19:02:49+02:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Finds all unique values in an array.

- Create a `Set` from the given array to discard duplicated values.
- Use the spread operator (`...`) to convert it back to an array.

```js
const uniqueElements = arr => [...new Set(arr)];
```

```js
uniqueElements([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
```
