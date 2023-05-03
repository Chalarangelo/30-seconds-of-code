---
title: Value is array-like
type: snippet
tags: [type,array]
cover: colorful-plastic
dateModified: 2020-10-20T23:02:01+03:00
---

Checks if the provided argument is array-like (i.e. is iterable).

- Check if the provided argument is not `null` and that its `Symbol.iterator` property is a function.

```js
const isArrayLike = obj =>
  obj != null && typeof obj[Symbol.iterator] === 'function';
```

```js
isArrayLike([1, 2, 3]); // true
isArrayLike(document.querySelectorAll('.className')); // true
isArrayLike('abc'); // true
isArrayLike(null); // false
```
