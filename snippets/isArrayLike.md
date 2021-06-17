---
title: isArrayLike
tags: type,array,intermediate
firstSeen: 2017-12-31T14:53:01+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
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
