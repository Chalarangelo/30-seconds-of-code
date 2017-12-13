### Diff Two Arrays

Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both.
In other words, return the symmetric difference of the two arrays.
- Merge the list to make it easy to compare functions.
- Use filter to get the new array, you will need to create a callback function.
- The best way to go about the callback function is to check if the number from the new merged array is not in both original arrays and return it.

```
function diffArray(arr1, arr2) {
    return arr1
      .filter(el => !arr2.includes(el))
      .concat(
        arr2.filter(el => !arr1.includes(el))
      )
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]); // 4
```
