---
title: Uppercase object keys
tags: object
author: chalarangelo
cover: sofia-tram
firstSeen: 2023-02-11T05:00:00-04:00
---

Converts all the keys of an object to upper case.

- Use `Object.keys()` to get an array of the object's keys.
- Use `Array.prototype.reduce()` to map the array to an object, using `String.prototype.toUpperCase()` to uppercase the keys.

```js
const upperize = obj =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k.toUpperCase()] = obj[k];
    return acc;
  }, {});
```

```js
upperize({ Name: 'John', Age: 22 }); // { NAME: 'John', AGE: 22 }
```
