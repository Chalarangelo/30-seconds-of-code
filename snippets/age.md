---
title: age
tags: array,some,beginner
---

Checks whether at least one element in the array passes the test implemented by the function.

- Use `Array.prototype.some()` to test each element in the array, It returns a Boolean value.
- When at least one element in the array passes the test then .some() returns true immediately.

```js
const age = [33, 24, 39, 41, 58, 61, 67];
function isMoreThan100 (n){
  return n>100;
}
```

```js
console.log(age.some(isMoreThan100));
```
