---
title: objectToEntries
tags: object,array,beginner
---

Creates an array of key-value pair arrays from an object.

Use `Object.keys()` and `Array.prototype.map()` to iterate over the object's keys and produce an array with key-value pairs.

```js
const objectToEntries = obj => Object.keys(obj).map(k => [k, obj[k]]);
```

```js
objectToEntries({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]
```
