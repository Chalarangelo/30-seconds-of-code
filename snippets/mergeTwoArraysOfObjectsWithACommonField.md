---
title: mergeTwoArraysOfObjectsWithACommonField
tags: node,beginner
---

Creates a directory, if it does not exist.

- `mergeByCommonField()` takes two arrays with common field and returns the merged array.

```js
const mergeByField = (a1, a2) =>
  a1.map((itm) => ({
    ...a2.find((item) => item.field === itm.field && item),
    ...itm,
  }));
let arr = mergeByField(arr1, arr2);
```

```js
let arr = mergeByField(arr1, arr2); // Returns the array of objects which has common field 
```
