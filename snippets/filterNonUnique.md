---
title: filterNonUnique
tags: array,beginner
---

Creates an array with the non-unique values filtered out.

- Use `Array.prototype.filter()` to create an array containing only the unique values.

```js
const filterNonUnique = arr =>
  arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
```

```js
filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]
```
