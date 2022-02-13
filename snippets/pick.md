---
title: Pick object keys
tags: object,intermediate
firstSeen: 2017-12-13T23:51:34+02:00
lastUpdated: 2020-10-18T14:58:09+03:00
---

Picks the key-value pairs corresponding to the given keys from an object.

- Use `Array.prototype.reduce()` to convert the filtered/picked keys back to an object with the corresponding key-value pairs if the key exists in the object.

```js
const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
```

```js
pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }
```
