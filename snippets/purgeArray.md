---
title: purge
tags: array,function,beginner
---

Given an array `arr`, returns a copy of `arr` with all the undefined and null values `filtered` out.

- It clones the original array using the spread operator, then it uses `Array.prototype.filter()` to check if the `type of` the element is `undefined` or if its string representations is `null`
- The function also receives a second argument called `strictMode`, if it's true then it will also removes all falsy values from the array. It defaults to `false`.

```js
const purge = (arr, strictMode = false) => {
  return [...arr].filter(element => {
    if (strictMode) {
      return element;
    } else {
      return typeof element !== "undefined" && String(element) !== "null";
    }
  });
}
```

```js
purge([1, null, 3, '', undefined, false, 5]); // [1, 3, "", false, 5]
purge([1, null, 3, '', undefined, false, 5], true); // [1, 3, 5]
```
