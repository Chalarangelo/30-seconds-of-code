---
title: Deep freeze object
type: snippet
language: javascript
tags: [object,recursion]
cover: camper-school-bus
dateModified: 2020-10-19
---

Deep freezes an object.

- Use `Object.keys()` to get all the properties of the passed object, `Array.prototype.forEach()` to iterate over them.
- Call `Object.freeze()` recursively on all properties, applying `deepFreeze()` as necessary.
- Finally, use `Object.freeze()` to freeze the given object.

```js
const deepFreeze = obj => {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object') deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};
```

```js
'use strict';

const val = deepFreeze([1, [2, 3]]);

val[0] = 3; // not allowed
val[1][0] = 4; // not allowed as well
```
