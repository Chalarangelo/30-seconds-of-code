---
title: takeUntil
tags: array,intermediate
---

Removes elements in an array until the passed function returns `true`.
Returns the removed elements.

- Loop through the array, using a `for...of` loop over `Array.prototype.entries()` until the returned value from the function is truthy.
- Return the removed elements, using `Array.prototype.slice()`.
- The callback function, `fn`, accepts a single argument which is the value of the element.

```js
const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};
```

```js
takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]
```
