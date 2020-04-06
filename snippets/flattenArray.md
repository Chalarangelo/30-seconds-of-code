---
title: flattenArray
tags: array,function,intermediate
---

Flattens the given n dimensional array into a 1-dimensional array

```js
const flattenArray = (array) => array.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? flattenArray(curr) : curr), [])
```

```js
flattenArray([1 , [2, [3, 4, [ 5 ]]]]) //[1, 2, 3, 4, 5]
```