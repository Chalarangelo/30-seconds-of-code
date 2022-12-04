---
title: Rename object keys
tags: object
cover: blog_images/fallen-leaves.jpg
firstSeen: 2018-04-10T20:22:39+03:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Replaces the names of multiple object keys with the values provided.

- Use `Object.keys()` in combination with `Array.prototype.reduce()` and the spread operator (`...`) to get the object's keys and rename them according to `keysMap`.

```js
const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );
```

```js
const obj = { name: 'Bobo', job: 'Front-End Master', shoeSize: 100 };
renameKeys({ name: 'firstName', job: 'passion' }, obj);
// { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 }
```
