---
title: mergeTwoArraysOfObjectsWithACommonField
tags: node,beginner
---

- `mergeByCommonField()` takes two arrays with common field and returns the merged array.

```js
const mergeByCommonField = (a1, a2) =>
  a1.map((itm) => ({
    ...a2.find((item) => item.field === itm.field && item),
    ...itm,
  }));
```

```js
let arr = mergeByCommonField(arr1, arr2); // Returns the array of objects which has common field 
```
