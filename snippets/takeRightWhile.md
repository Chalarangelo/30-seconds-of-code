---
title: Remove list elements from the end while condition is met
tags: array
expertise: intermediate
firstSeen: 2018-01-26T12:55:31+02:00
lastUpdated: 2020-11-29T12:04:53+02:00
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
