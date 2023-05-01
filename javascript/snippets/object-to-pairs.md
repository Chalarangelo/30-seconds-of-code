---
title: Object to pairs
type: snippet
tags: [object,array]
author: chalarangelo
cover: interior-5
dateModified: 2020-09-15T16:28:04+03:00
---

Creates an array of key-value pair arrays from an object.

- Use `Object.entries()` to get an array of key-value pair arrays from the given object.

```js
const objectToPairs = obj => Object.entries(obj);
```

```js
objectToPairs({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]
```
