---
title: Value is object-like
type: snippet
language: javascript
tags: [type,object]
cover: messy-computer
dateModified: 2020-09-15
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
