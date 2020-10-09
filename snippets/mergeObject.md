---
title: mergeObject
tags: object,intermediate
---

Merge an object causing mutation only in the first object.

- Uses `Object.assign` to assign objects to an object.
- Pass spread `...rest` values to be assigned.

```js
const mergeObject = (...rest) => Object.assign({}, ...rest);
```

```js
mergeObject({ name: 'Rick'}, { name: 'Morty' }, { age: 14 }); // { name: "Morty", age: 14 }
```

