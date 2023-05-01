---
title: Object to entries
type: snippet
tags: [object,array]
author: chalarangelo
cover: shapes
dateModified: 2020-09-15T16:28:04+03:00
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
