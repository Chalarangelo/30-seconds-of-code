---
title: Common keys
tags: object
author: chalarangelo
cover: symmetry-cloudy-mountain
firstSeen: 2022-04-23T05:00:00-04:00
---

Finds the common keys between two objects.

- Use `Object.keys()` to get the keys of the first object.
- Use `Object.prototype.hasOwnProperty()` to check if the second object has a key that's in the first object.
- Use `Array.prototype.filter()` to filter out keys that aren't in both objects.

```js
const commonKeys = (obj1, obj2) =>
  Object.keys(obj1).filter(key => obj2.hasOwnProperty(key));
```

```js
commonKeys({ a: 1, b: 2 }, { a: 2, c: 1 }); // ['a']
```
