---
title: cmp
tags: javascript,array,beginner
---

to compare two arrays.

If the arguments provided ("array1" and "array2") are the same the function returns true otherwise return False.

```js
const cmp = (array1,array2) =>
  {return JSON.stringify(a)==JSON.stringify(b)}
```

```js
let a = [1, 2, 3, 5]; 
let b = [1, 2, '3', 5];
cmp(a,b) // false
cmp(b,b) // true
```
