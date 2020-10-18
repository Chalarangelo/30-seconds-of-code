---
title: takeWhile
tags: array,intermediate
---

Removes elements in an array until the passed function returns `true`. Returns the removed elements.

- Loop through the array, using a `for...of` loop over `Array.prototype.entries()` until the returned value from the function is `true`.
- Return the removed elements, using `Array.prototype.slice()`.

```js
const takeWhile = (arr, func) => {
  for (const [i, val] of arr.entries()) if (func(val)) return arr.slice(0, i);
  return arr;
};
```

```js
takeWhile([1, 2, 3, 4], n => n >= 3); // [1, 2]
```
