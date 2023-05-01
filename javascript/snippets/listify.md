---
title: Map an object to an array
type: snippet
tags: [object,array]
author: chalarangelo
cover: metro-arrival
dateModified: 2023-02-05T05:00:00-04:00
---

Maps an object to an object array, using the provided mapping function.

- Use `Object.entries()` to get an array of the object's key-value pairs.
- Use `Array.prototype.reduce()` to map the array to an object.
- Use `mapFn` to map the keys and values of the object and `Array.prototype.push()` to add the mapped values to the array.

```js
const listify = (obj, mapFn) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc.push(mapFn(key, value));
    return acc;
  }, []);
```

```js
const people = { John: { age: 42 }, Adam: { age: 39 } };
listify(people, (key, value) => ({ name: key, ...value }));
// [ { name: 'John', age: 42 }, { name: 'Adam', age: 39 } ]
```
