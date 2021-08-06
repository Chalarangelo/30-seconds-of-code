---
title: rotateArrByK
tags: array,intermediate
firstSeen: 2021-08-06T10:58:54+00:00
lastUpdated: 2021-08-06T11:49:53+00:00
---

Rotates the given array by k to either left or right direction.

- Use a helper function i.e. `reversePortion` to reverse a portion of the given array.
- If value `k` is not in the valid range of array `arr`, then take the modulus of `k` using `Array.prototype.length` to bring `k` into the range of array `arr`.
- If `k` is negative, rotate the array `arr` by `k` units to the left otherwise by `k` units to the right.

```js
const rotateArrByK = (arr, k) =>
  {
    k %= arr.length;
    if(k < 0){
      k += arr.length;
    }
    reversePortion(arr, 0, arr.length - 1);
    reversePortion(arr, 0, k - 1);
    reversePortion(arr, k, arr.length - 1);
    return arr; 
  };

const reversePortion = (arr, start, end) =>
  {
    while(start < end){
      let temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      start++;
      end--;    
   }
};
```

```js
rotateArrByK([1, 2, 3, 4, 5], 2); // [ 4, 5, 1, 2, 3 ]
rotateArrByK([1, 2, 3, 4, 5], 7); // [ 4, 5, 1, 2, 3 ]
rotateArrByK([1, 2, 3, 4, 5], -2); // [ 3, 4, 5, 1, 2 ]
rotateArrByK([1, 2, 3, 4, 5], -7); // [ 3, 4, 5, 1, 2 ]
```