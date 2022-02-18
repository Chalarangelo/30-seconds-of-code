---
title: Get nested value in object
tags: object,recursion,intermediate
firstSeen: 2018-07-08T23:06:24+03:00
lastUpdated: 2020-10-19T18:51:03+03:00
---

Gets the target value in a nested JSON object, based on the given key.

- Use the `in` operator to check if `target` exists in `obj`.
- If found, return the value of `obj[target]`.
- Otherwise use `Object.values()` and `Array.prototype.reduce()` to recursively call `dig` on each nested object until the first matching key/value pair is found.

```js
const dig = (obj, target) =>
  target in obj
    ? obj[target]
    : Object.values(obj).reduce((acc, val) => {
        if (acc !== undefined) return acc;
        if (typeof val === 'object') return dig(val, target);
      }, undefined);
```

```js
const data = {
  level1: {
    level2: {
      level3: 'some data'
    }
  }
};
dig(data, 'level3'); // 'some data'
dig(data, 'level4'); // undefined
```
