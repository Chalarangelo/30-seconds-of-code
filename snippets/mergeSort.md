---
title: Merge Sort 
tags: array,sort,mergesort
---

This algorithm implements Merge Sort in Java Script, It works as follows

- Receives an array to be sorted
- Find middle element of the array
- Devide array to two arrays, by middle element
- Recursively call merge sort for first array
- Recursively call merge sort for second array
- Merge two sorted arrays
- Return the final sorted array

```js
function mergeSort(arr){
    var len=arr.length;
    var middle,unsortedLeftArray,unsortedRightArray,sortedLeftArray,sortedRightArray;
    if ( len > 1){
        middle = Math.floor(len/2);
        unsortedLeftArray = arr.slice(0, middle); 
        unsortedRightArray = arr.slice(middle, len); 
        arr=[];
        sortedLeftArray = mergeSort(unsortedLeftArray);
        sortedRightArray = mergeSort(unsortedRightArray);
        while (sortedLeftArray.length > 0 && sortedRightArray.length > 0){
            if (sortedLeftArray[0] < sortedRightArray[0]){
                arr.push(sortedLeftArray[0]);
                sortedLeftArray.shift();
            }
            else{
                arr.push(sortedRightArray[0]);
                sortedRightArray.shift()
            }
        }
        arr=arr.concat(sortedLeftArray);
        arr=arr.concat(sortedRightArray);
    }
    return arr
}
```

```js
mergeSort([1,5,2,2,0]) // [ 0, 1, 2, 2, 5 ]
```





