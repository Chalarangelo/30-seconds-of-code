---
title: Remove list elements while condition is met
tags: array
cover: blog_images/colors-mural.jpg
firstSeen: 2018-01-26T12:55:31+02:00
lastUpdated: 2020-11-29T12:04:53+02:00
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
