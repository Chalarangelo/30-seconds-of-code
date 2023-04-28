---
title: Truth check collection
type: snippet
tags: [object,logic,array]
cover: digital-nomad-8
dateModified: 2020-10-22T20:24:44+03:00
---

Checks if the predicate function is truthy for all elements of a collection.

- Use `Array.prototype.every()` to check if each passed object has the specified property and if it returns a truthy value.

```js
const truthCheckCollection = (collection, pre) =>
  collection.every(obj => obj[pre]);
```

```js
truthCheckCollection(
  [
    { user: 'Tinky-Winky', sex: 'male' },
    { user: 'Dipsy', sex: 'male' },
  ],
  'sex'
); // true
```
