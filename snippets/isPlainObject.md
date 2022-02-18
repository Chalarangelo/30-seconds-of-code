---
title: Value is plain object
tags: type,object,intermediate
firstSeen: 2018-01-19T13:59:12+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Checks if the provided value is an object created by the Object constructor.

- Check if the provided value is truthy.
- Use `typeof` to check if it is an object and `Object.prototype.constructor` to make sure the constructor is equal to `Object`.

```js
const isPlainObject = val =>
  !!val && typeof val === 'object' && val.constructor === Object;
```

```js
isPlainObject({ a: 1 }); // true
isPlainObject(new Map()); // false
```
