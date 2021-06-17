---
title: frozenSet
tags: array,intermediate
firstSeen: 2020-10-11T11:52:48+03:00
lastUpdated: 2020-10-11T11:52:48+03:00
---

Creates a frozen `Set` object.

- Use the `new Set()` constructor to create a new `Set` object from `iterable`.
- Set the `add`, `delete` and `clear` methods of the newly created object to `undefined`, so that they cannot be used, practically freezing the object.

```js
const frozenSet = iterable => {
  const s = new Set(iterable);
  s.add = undefined;
  s.delete = undefined;
  s.clear = undefined;
  return s;
};
```

```js
frozenSet([1, 2, 3, 1, 2]); 
// Set { 1, 2, 3, add: undefined, delete: undefined, clear: undefined }
```
