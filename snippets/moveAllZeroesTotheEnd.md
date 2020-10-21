---
title: shifting
tags: array,medium
---

Returns the array of numbers where all zeroes are moved to end.

- Find if there is any 0 then do one left shift operation so that zero will be moved to end.
- Return the array of numbers.

<!--
 * @param {number[]} nums
 * @return {array} .
 -->

```js
var moveZeroes = function(arr) {
    var i, j;

    for (i = 0; i < arr.length-1; i++) {
        if(arr[i] === 0) {
            for(j = i; j < arr.length-1; j++) {
                arr[j]=arr[j+1];
            }
            arr[j] = 0;
        }
    }
    return arr;
};
```

```js
moveZeroes(0,2,0,0,3,1);
```