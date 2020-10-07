---
title: removeAll
tags: array,intermediate
---

Modifies an array in place by removing all elements for which the given function returns `false`.

- Uses `Array.prototype.filter()` to find array elements that return truthy values and `Array.prototype.reduce()` to remove elements using `Array.prototype.splice()`.
- The `func` is invoked with three arguments (`value, index, array`).

```js

const removeAll = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];
```

```js
removeAll([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]
```
