---
title: Remove matching elements from array
type: snippet
tags: [array]
cover: highlands
dateModified: 2020-10-22T20:24:04+03:00
---

Mutates an array by removing elements for which the given function returns `false`.

- Use `Array.prototype.filter()` to find array elements that return truthy values.
- Use `Array.prototype.reduce()` to remove elements using `Array.prototype.splice()`.
- The callback function is invoked with three arguments (value, index, array).

```js
const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];
```

```js
remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]
```
