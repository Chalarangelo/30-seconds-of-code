---
title: Lowercase object keys
tags: object
author: chalarangelo
cover: building-facade
firstSeen: 2023-02-12T05:00:00-04:00
---

Converts all the keys of an object to lower case.

- Use `Object.keys()` to get an array of the object's keys.
- Use `Array.prototype.reduce()` to map the array to an object, using `String.prototype.toLowerCase()` to lowercase the keys.

```js
const lowerize = obj =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k.toLowerCase()] = obj[k];
    return acc;
  }, {});
```

```js
lowerize({ Name: 'John', Age: 22 }); // { name: 'John', age: 22 }
```
