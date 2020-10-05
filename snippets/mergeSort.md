---
title: mergeSort
tags: recursion,array,function,sorting
---

Sort and unsorted array with mergeSort.

- Recursively split the array into half using `Array.prototype.slice()` and apply `mergeSort` on both halves.
- Use `merge` to merge the two sorted arrays.

```js
const merge = (a1, a2) => {
    let sorted = [];
    while (a1.length && a2.length) {
      if (a1[0] < a2[0]) 
          sorted.push(a1.shift());
      else 
          sorted.push(a2.shift());
    };
    return sorted.concat(a1.slice().concat(a2.slice()));
};
const mergeSort = (arr) => {
    if (arr.length <= 1) 
        return arr;
    let mid = Math.floor(arr.length / 2),
        left = mergeSort(arr.slice(0, mid)),
        right = mergeSort(arr.slice(mid));
    return merge(left, right);
};
```

```js
mergeSort([2, -2 , 0 , 8 , 7, 88 , -99 , 20 , -50]); // [-99 , -50 , -2 , 0 , 2 , 7 , 8 , 20 , 88]
```
