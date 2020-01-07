---
title: remove
tags: array,intermediate
---

Removes elements from an array for which the given function returns `true` and returns an array of the removed elements.

Use `Array.prototype.filter()` to find array elements that return truthy values and `Array.prototype.reduce()` to remove elements using `Array.prototype.splice()`.
The `fn` is invoked with three arguments (`value, index, array`).

```js
const remove = (arr, fn) =>
  Array.isArray(arr)
    ? arr.filter(fn).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];
```

```js
const arr = [1, 2, 3, 4];
const evenNums = remove(arr, n => n % 2 === 0);

console.log(evenNums); // [2, 4]
console.log(arr); // [1, 3]
```
