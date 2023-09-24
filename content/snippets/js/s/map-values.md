---
title: Map object values
type: snippet
language: javascript
tags: [object]
cover: travel-mug-1
dateModified: 2020-10-21
---

Maps the values of an object using the provided function, generating a new object with the same keys.

- Use `Object.keys()` to iterate over the object's keys.
- Use `Array.prototype.reduce()` to create a new object with the same keys and mapped values using `fn`.

```js
const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});
```

```js
const users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 }
};
mapValues(users, u => u.age); // { fred: 40, pebbles: 1 }
```
