---
title: Lowercase object keys
type: snippet
language: javascript
tags: [object]
author: chalarangelo
cover: building-facade
dateModified: 2023-02-12
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
