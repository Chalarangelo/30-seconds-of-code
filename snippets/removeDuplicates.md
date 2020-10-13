---
title: removeDuplicates
tags: array,set,begginer
---

Removes all duplicates from the array.

- Creates a Set object from given array (value in the Set may only occur once).
- Creates an array out of a Set object with spread syntax ([...set]) and returns it.

```js
const removeDuplicates = array =>
  {
    return [...new Set(array)]
  }
```

```js
removeDuplicates([1, 1, 3, 7, 3, 6, 5, 6, 6]); // [1, 3, 7, 6, 5]
```
