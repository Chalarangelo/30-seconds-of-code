---
title: SortNumbers
tags: array,beginner
---

Sorts out the numbers in an array using `WindowOrWorkerGlobalScope.setTimeout()`.

- returns all the numbers in an an array sorted in ascending order.
- Uses the `.setTimeout` or `WindowOrWorkerGlobalScope.setTimeout()` method.

```js
function sortNum () {
const arr = [2, 1, 19, 7, 50, 16 ];
arr.forEach(num => {
  setTimeout(() => console.log(num), num);
});
}

```

```js
sortNum(); //1 2 7 16 19 50
            
```
