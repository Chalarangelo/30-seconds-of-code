---
title: Remove array elements while condition is met
type: snippet
language: javascript
tags: [array]
cover: sunset-textured-beach
dateModified: 2020-11-29
---

Removes elements in an array until the passed function returns `false`.
Returns the removed elements.

- Loop through the array, using a `for...of` loop over `Array.prototype.entries()` until the returned value from the function is falsy.
- Return the removed elements, using `Array.prototype.slice()`.
- The callback function, `fn`, accepts a single argument which is the value of the element.

```js
const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};
```

```js
takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]
```
