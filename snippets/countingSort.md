---
title: countingSort
tags: algorithm,array,intermediate
---

Sort an array of non-negative numbers, using the counting sort algorithm.

- Declare three variables
  - `maxVal`, which is assigned to the maximum value found in the input array(`inArray`) using `Math.max()`
    - using the spread-operator (`...`) to convert the array to a sequece of its elements
  - `countArray`, which is used to count the occurences of each element in the input array
  - `outArray`, which will be returned as the sorted array
- Use a `for`-loop to initialize `countArray` with all zeros
  - note that `countArray`s length is equal to the value stored in `maxVal + 1`
- Use a `for`-loop to count the occurences of each number from `0` to `maxVal` within `inputArray`
  - note that each number also represents its index in `countArray`
- Use a `for`-loop to store the cummulative sum of the elements of `countArray`
  - this is needed to place the elements into the correct index in `outputArray` without having to use a `swap`-function
- Use another `for`-loop (this time in descending order) to fill the `outputArray` using `countArray`

``` js
const countingSort = inputArray => {

  // find maximum element in input array
  const maximumValue = Math.max(...inputArray);
  const countArray = [];
  const outputArray = [];

  // initialize the "counting" array with all elements 0
  for(let i = 0; i < maximumValue + 1; i++) {
    countArray[i] = 0;
  }

  // store the count of each element of input array at it's index
  for (let i = 0; i < inputArray.length; i++) {
    countArray[inputArray[i]]++;
  }

  // sets the cummulative count over input array
  for(let i = 1; i < maximumValue + 1; i++ ) {
    countArray[i] += countArray[i - 1];
  }

  // fills the holding array after ordering the indexes of 
  // input array and counting array
  for(let i = inputArray.length - 1; i >= 0; i--) {
    outputArray[countArray[inputArray[i]] - 1] = inputArray[i];
    countArray[inputArray[i]]--;
  }

  return outputArray;
}
```

``` js
countingSort([5, 1, 3, 0]); // [0, 1, 3, 5]
```
