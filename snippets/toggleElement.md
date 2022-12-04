---
title: Toggle element in array
tags: array
author: chalarangelo
cover: blog_images/digital-nomad-7.jpg
firstSeen: 2022-04-15T05:00:00-04:00
---

Removes an element from an array if it's included in the array, or pushes it to the array if it isn't.

- Use `Array.prototype.includes()` to check if the given element is in the array.
- Use `Array.prototype.filter()` to remove the element if it's in the array.
- Use the spread operator (`...`) to push the element if it's not in the array.

```js
const toggleElement = (arr, val) =>
  arr.includes(val) ? arr.filter(el => el !== val) : [...arr, val];

```

```js
toggleElement([1, 2, 3], 2); // [1, 3]
toggleElement([1, 2, 3], 4); // [1, 2, 3, 4]
```
