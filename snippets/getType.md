---
title: Type of value
tags: type
expertise: beginner
cover: blog_images/pink-flowers.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Returns the native type of a value.

- Return `'undefined'` or `'null'` if the value is `undefined` or `null`.
- Otherwise, use `Object.prototype.constructor` and `Function.prototype.name` to get the name of the constructor.

```js
const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);
```

```js
getType(new Set([1, 2, 3])); // 'Set'
```
