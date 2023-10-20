---
title: Uppercase object keys
type: snippet
language: javascript
tags: [object]
cover: sofia-tram
dateModified: 2023-02-11
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
