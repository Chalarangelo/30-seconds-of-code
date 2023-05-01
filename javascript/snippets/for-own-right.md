---
title: Iterate over object's own properties in reverse
type: snippet
tags: [object]
cover: sea-view
dateModified: 2020-10-19T22:49:51+03:00
---

Iterates over all own properties of an object in reverse, running a callback for each one.

- Use `Object.keys()` to get all the properties of the object, `Array.prototype.reverse()` to reverse their order.
- Use `Array.prototype.forEach()` to run the provided function for each key-value pair.
- The callback receives three arguments - the value, the key and the object.

```js
const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));
```

```js
forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'
```
