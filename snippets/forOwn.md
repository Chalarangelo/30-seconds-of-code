---
title: forOwn
tags: object,intermediate
---

Iterates over all own properties of an object, running a callback for each one.

Use `Object.keys(obj)` to get all the properties of the object, `Array.prototype.forEach()` to run the provided function for each key-value pair. The callback receives three arguments - the value, the key and the object.

```js
const forOwn = (obj, fn) => Object.keys(obj).forEach(key => fn(obj[key], key, obj));
```

```js
forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1
```