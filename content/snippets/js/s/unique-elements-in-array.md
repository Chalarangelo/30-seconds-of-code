---
title: Unique values in array
type: snippet
language: javascript
tags: [array]
cover: shelf-plant
dateModified: 2020-10-22
---

Finds all unique values in an array.

- Create a `Set` from the given array to discard duplicated values.
- Use the spread operator (`...`) to convert it back to an array.

```js
const uniqueElements = arr => [...new Set(arr)];
```

```js
uniqueElements([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
```
