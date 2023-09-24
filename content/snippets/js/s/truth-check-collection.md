---
title: Truth check collection
type: snippet
language: javascript
tags: [object,logic,array]
cover: digital-nomad-8
dateModified: 2020-10-22
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
