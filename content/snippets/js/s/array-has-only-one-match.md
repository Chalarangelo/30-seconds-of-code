---
title: Check if array has only one match
type: snippet
language: javascript
tags: [array]
cover: interior-10
dateModified: 2021-07-04
---

Checks if an array has only one value matching the given function.

- Use `Array.prototype.filter()` in combination with `fn` to find all matching array elements.
- Use `Array.prototype.length` to check if only one element matches `fn`.

```js
const hasOne = (arr, fn) => arr.filter(fn).length === 1;
```

```js
hasOne([1, 2], x => x % 2); // true
hasOne([1, 3], x => x % 2); // false
```
