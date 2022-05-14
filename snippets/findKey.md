---
title: Find first matching key
tags: object
expertise: intermediate
cover: blog_images/succulent-crowd.jpg
firstSeen: 2018-01-23T18:23:20+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Finds the first key that satisfies the provided testing function.
Otherwise `undefined` is returned.

- Use `Object.keys()` to get all the properties of the object, `Array.prototype.find()` to test each key-value pair using `fn`.
- The callback receives three arguments - the value, the key and the object.

```js
const findKey = (obj, fn) =>
  Object.keys(obj).find(key => fn(obj[key], key, obj));
```

```js
findKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  x => x['active']
); // 'barney'
```
