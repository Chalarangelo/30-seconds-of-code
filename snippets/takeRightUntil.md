---
title: Remove list elements from the end until condition is met
tags: array
expertise: intermediate
cover: blog_images/fruit-feast.jpg
firstSeen: 2020-11-29T12:04:53+02:00
lastUpdated: 2020-11-29T12:04:53+02:00
---

Removes elements from the end of an array until the passed function returns `true`.
Returns the removed elements.

- Create a reversed copy of the array, using the spread operator (`...`) and `Array.prototype.reverse()`.
- Loop through the reversed copy, using a `for...of` loop over `Array.prototype.entries()` until the returned value from the function is truthy.
- Return the removed elements, using `Array.prototype.slice()`.
- The callback function, `fn`, accepts a single argument which is the value of the element.

```js
const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};
```

```js
takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]
```
