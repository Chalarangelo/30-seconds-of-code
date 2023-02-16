---
title: Map an array to an object
tags: array,object
author: chalarangelo
cover: metro-tunnel
firstSeen: 2023-02-04T05:00:00-04:00
---

Maps an object array to an object, using the provided mapping functions.

- Use `Array.prototype.reduce()` to map the array to an object.
- Use `mapKey` to map the keys of the object and `mapValue` to map the values.

```js
const objectify = (arr, mapKey, mapValue = i => i) =>
  arr.reduce((acc, item) => {
    acc[mapKey(item)] = mapValue(item);
    return acc;
  }, {});
```

```js
const people = [ { name: 'John', age: 42 }, { name: 'Adam', age: 39 } ];
objectify(people, p => p.name.toLowerCase());
// { john: { name: 'John', age: 42 }, adam: { name: 'Adam', age: 39 } }
objectify(
  people,
  p => p.name.toLowerCase(),
  p => p.age
);
// { john: 42, adam: 39 }
```
