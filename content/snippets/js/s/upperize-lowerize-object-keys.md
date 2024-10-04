---
title: Uppercase or lowercase object keys in JavaScript
shortTitle: Uppercase or lowercase object keys
language: javascript
tags: [object]
excerpt: Convert all the keys of an object to upper or lower case.
cover: sofia-tram
listed: true
dateModified: 2024-01-10
---

Data processing often requires transformation of structures to conform to a specific format. A very simple example of this is **converting all the keys of an object to upper or lower case**, an easy task for JavaScript.

## Uppercase object keys

In order to convert all the keys of an object to upper case, we first need to obtain an **array of the object's keys**, using `Object.keys()`. Then, use `Array.prototype.reduce()` to **map the array to an object**, using `String.prototype.toUpperCase()` to uppercase the object's keys.

```js
const upperize = obj =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k.toUpperCase()] = obj[k];
    return acc;
  }, {});

upperize({ Name: 'John', Age: 22 }); // { NAME: 'John', AGE: 22 }
```

## Lowercase object keys

Similarly, to convert all the keys of an object to lower case, we can use the same approach. The only notable difference is that we use `String.prototype.toLowerCase()` to lowercase the object's keys.

```js
const lowerize = obj =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k.toLowerCase()] = obj[k];
    return acc;
  }, {});

lowerize({ Name: 'John', Age: 22 }); // { name: 'John', age: 22 }
```
