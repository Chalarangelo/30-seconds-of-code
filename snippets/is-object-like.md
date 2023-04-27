---
title: Value is object-like
tags: type,object
cover: orange-flower
firstSeen: 2018-01-23T19:30:03+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Checks if a value is object-like.

- Check if the provided value is not `null` and its `typeof` is equal to `'object'`.

```js
const isObjectLike = val => val !== null && typeof val === 'object';
```

```js
isObjectLike({}); // true
isObjectLike([1, 2, 3]); // true
isObjectLike(x => x); // false
isObjectLike(null); // false
```
