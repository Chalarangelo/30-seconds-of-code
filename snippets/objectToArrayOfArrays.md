---
title: objectToArrayOfArrays
tags: object,array,beginner,mongodbDocument
---

Creates an array of arrays containing a single object from an object of objects.

- Use `Object.entries()` to iterate over the object and produce an array arrays containing.

```js
const objectToArrayOfArrays = obj => Object.entries(obj);
```

```js
objectToArrayOfArrays({{1}, {2}, {3}, {4}}); // [[{1}], [{2}], [{3}], [{4}]]
```