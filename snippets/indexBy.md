---
title: Index array based on function
tags: array,object
expertise: intermediate
author: chalarangelo
cover: blog_images/guitar-living-room.jpg
firstSeen: 2021-06-20T05:00:00-04:00
---

Creates an object from an array, using a function to map each value to a key.

- Use `Array.prototype.reduce()` to create an object from `arr`.
- Apply `fn` to each value of `arr` to produce a key and add the key-value pair to the object.

```js
const indexBy = (arr, fn) =>
  arr.reduce((obj, v, i) => {
    obj[fn(v, i, arr)] = v;
    return obj;
  }, {});
```

```js
indexBy([
  { id: 10, name: 'apple' },
  { id: 20, name: 'orange' }
], x => x.id);
// { '10': { id: 10, name: 'apple' }, '20': { id: 20, name: 'orange' } }
```
