---
title: Object to pairs
tags: object,array
expertise: beginner
author: chalarangelo
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-09-15T16:28:04+03:00
---

Creates an array of key-value pair arrays from an object.

- Use `Object.entries()` to get an array of key-value pair arrays from the given object.

```js
const objectToPairs = obj => Object.entries(obj);
```

```js
objectToPairs({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]
```
