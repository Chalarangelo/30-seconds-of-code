---
title: isDuplicates
tags: array,intermediate
---

Check if there's duplicate values in a flat array.

- Convert original array into a Set.
- The `.size()` returns the number of (unique) elements in a Set object.
- Compare the lengths of the array and the Set.


```js
function isDuplicates(array) {
  return new Set(array).size !== array.length
}
```

```js
isDuplicates([0,1,1,2]); // 'True'
isDuplicates([0,1,2,3,]); // 'False'
```
