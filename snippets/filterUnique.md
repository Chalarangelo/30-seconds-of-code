---
title: filterUnique
tags: array,beginner
---

Creates an array with the unique values filtered out.

- Use `new Set()` and the spread operator (`...`) to create an array of the unique values in `arr`.
- Use `Array.prototype.filter()` to create an array containing only the non-unique values.

```js
const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));
```

```js
filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]
```
