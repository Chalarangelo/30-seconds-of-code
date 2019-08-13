---
title: uniqueElements
tags: array,beginner
---

Returns all unique values of an array.

Use ES6 `Set` and the `...rest` operator to discard all duplicated values.

```js
const uniqueElements = arr => [...new Set(arr)];
```

```js
uniqueElements([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
```