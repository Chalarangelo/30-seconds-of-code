---
title: findLastKey
tags: object,intermediate
firstSeen: 2018-01-23T18:23:20+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Finds the last key that satisfies the provided testing function.
Otherwise `undefined` is returned.

- Use `Object.keys(obj)` to get all the properties of the object.
- Use `Array.prototype.reverse()` to reverse the order and `Array.prototype.find()` to test the provided function for each key-value pair.
- The callback receives three arguments - the value, the key and the object.

```js
const findLastKey = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .find(key => fn(obj[key], key, obj));
```

```js
findLastKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  x => x['active']
); // 'pebbles'
```
