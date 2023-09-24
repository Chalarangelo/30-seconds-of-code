---
title: Remove array elements from the end while condition is met
type: snippet
language: javascript
tags: [array]
cover: tranquil-desktop
dateModified: 2020-11-29
---

Removes elements from the end of an array until the passed function returns `false`.
Returns the removed elements.

- Create a reversed copy of the array, using the spread operator (`...`) and `Array.prototype.reverse()`.
- Loop through the reversed copy, using a `for...of` loop over `Array.prototype.entries()` until the returned value from the function is falsy.
- Return the removed elements, using `Array.prototype.slice()`.
- The callback function, `fn`, accepts a single argument which is the value of the element.

```js
const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};
```

```js
takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]
```
