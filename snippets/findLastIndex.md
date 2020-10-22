---
title: findLastIndex
tags: array,intermediate
---

Finds the index of the last element for which the provided function returns a truthy value.

- Use `Array.prototype.map()` to map each element to an array with its index and value.
- Use `Array.prototype.filter()` to remove elements for which `fn` returns falsy values
- Use `Array.prototype.pop()` to get the last element in the filtered array.
- Return `-1` if there are no matching elements.

```js
const findLastIndex = (arr, fn) =>
  (arr
    .map((val, i) => [i, val])
    .filter(([i, val]) => fn(val, i, arr))
    .pop() || [-1])[0];
```

```js
findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2 (index of the value 3)
findLastIndex([1, 2, 3, 4], n => n === 5); // -1 (default value when not found)
```
