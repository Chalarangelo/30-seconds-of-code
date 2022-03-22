---
title: Object to entries
tags: object,array
expertise: beginner
author: chalarangelo
firstSeen: 2020-04-16T11:10:13+03:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Creates an array of key-value pair arrays from an object.

- Use `Object.keys()` and `Array.prototype.map()` to iterate over the object's keys and produce an array with key-value pairs.
- [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) provides similar functionality.

```js
const objectToEntries = obj => Object.keys(obj).map(k => [k, obj[k]]);
```

```js
objectToEntries({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]
```
