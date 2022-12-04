---
title: Assert object keys are valid
tags: object
author: chalarangelo
cover: blog_images/river-flow.jpg
firstSeen: 2021-07-18T05:00:00-04:00
---

Validates all keys in an object match the given `keys`.

- Use `Object.keys()` to get the keys of the given object, `obj`.
- Use `Array.prototype.every()` and `Array.prototype.includes()` to validate that each key in the object is specified in the `keys` array.

```js
const assertValidKeys = (obj, keys) =>
  Object.keys(obj).every(key => keys.includes(key));
```

```js
assertValidKeys({ id: 10, name: 'apple' }, ['id', 'name']); // true
assertValidKeys({ id: 10, name: 'apple' }, ['id', 'type']); // false
```
