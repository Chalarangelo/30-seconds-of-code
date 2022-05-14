---
title: Omit object properties based on function
tags: object
expertise: intermediate
cover: blog_images/arrow-functions.jpg
firstSeen: 2018-01-19T13:23:45+02:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Omits the key-value pairs corresponding to the keys of the object for which the given function returns falsy.

- Use `Object.keys()` and `Array.prototype.filter()` to remove the keys for which `fn` returns a truthy value.
- Use `Array.prototype.reduce()` to convert the filtered keys back to an object with the corresponding key-value pairs.
- The callback function is invoked with two arguments: (value, key).

```js
const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
```

```js
omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }
```
