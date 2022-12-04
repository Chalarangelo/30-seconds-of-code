---
title: Map object keys
tags: object
cover: blog_images/rocky-mountains-2.jpg
firstSeen: 2018-01-11T20:33:14+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Maps the keys of an object using the provided function, generating a new object.

- Use `Object.keys()` to iterate over the object's keys.
- Use `Array.prototype.reduce()` to create a new object with the same values and mapped keys using `fn`.

```js
const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});
```

```js
mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }
```
