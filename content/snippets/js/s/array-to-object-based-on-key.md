---
title: Array to object based on key
type: snippet
language: javascript
tags: [array,object]
author: chalarangelo
cover: lavender-shelf
dateModified: 2021-06-27
---

Creates an object from an array, using the specified key and excluding it from each value.

- Use `Array.prototype.reduce()` to create an object from `arr`.
- Use object destructuring to get the value of the given `key` and the associated `data` and add the key-value pair to the object.

```js
const indexOn = (arr, key) =>
  arr.reduce((obj, v) => {
    const { [key]: id, ...data } = v;
    obj[id] = data;
    return obj;
  }, {});
```

```js
indexOn([
  { id: 10, name: 'apple' },
  { id: 20, name: 'orange' }
], 'id');
// { '10': { name: 'apple' }, '20': { name: 'orange' } }
```
