---
title: uniqueElements
tags: array,beginner
---

Finds all unique values in an array.

- Create a `new Set()` from the given array to discard duplicated values.
- Use the spread operator (`...`) to convert it back to an array.

```js
const uniqueElements = arr => [...new Set(arr)];
```

```js
uniqueElements([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
```
