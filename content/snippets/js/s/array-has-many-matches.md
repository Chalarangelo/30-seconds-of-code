---
title: Check if array has many matches
type: snippet
language: javascript
tags: [array]
author: chalarangelo
cover: interior-2
dateModified: 2021-07-11
---

Checks if an array has more than one value matching the given function.

- Use `Array.prototype.filter()` in combination with `fn` to find all matching array elements.
- Use `Array.prototype.length` to check if more than one element match `fn`.

```js
const hasMany = (arr, fn) => arr.filter(fn).length > 1;
```

```js
hasMany([1, 3], x => x % 2); // true
hasMany([1, 2], x => x % 2); // false
```
