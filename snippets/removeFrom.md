---
title: removeFrom
tags: array,beginner
---

Mutates array by removing a single element in provided index.  

- Use `Array.prototype.filter()` to remove element from arr.

```js
const removeFrom = (arr, i) => arr.filter(item => item !== arr[i])
```

```js
removeFrom([1, 2, 3], 1); // '[1, 3]'
```
