---
title: Iterate over object's own properties
tags: object
expertise: intermediate
firstSeen: 2018-01-18T16:45:56+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Iterates over all own properties of an object, running a callback for each one.

- Use `Object.keys()` to get all the properties of the object.
- Use `Array.prototype.forEach()` to run the provided function for each key-value pair.
- The callback receives three arguments - the value, the key and the object.

```js
const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));
```

```js
forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1
```
