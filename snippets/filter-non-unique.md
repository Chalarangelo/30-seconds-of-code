---
title: Filter non-unique array values
type: snippet
tags: [array]
cover: digital-nomad-10
dateModified: 2020-11-02T19:40:45+02:00
---

Creates an array with the non-unique values filtered out.

- Use the `Set` constructor and the spread operator (`...`) to create an array of the unique values in `arr`.
- Use `Array.prototype.filter()` to create an array containing only the unique values.

```js
const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
```

```js
filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]
```
