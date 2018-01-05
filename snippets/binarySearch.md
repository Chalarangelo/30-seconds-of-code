### binarySearch

Use recursion to perform a logarithmic search similar to `.indexOf()` that finds the index of a value within an array. The two differences being 
1. Operation only works with sorted arrays
2. Offers a major performance boost when compared to a linear search or `.indexOf()` 

```js
const binarySearch = (arr, val, start = 0, end = arr.length - 1) => {
  if (start > end) return -1;
  const mid = Math.floor((start + end) / 2);
  const target = arr[mid];
  return (target > val) 
      ? binarySearch(arr, val, start, mid - 1)
      : (target < val) 
        ? binarySearch(arr, val, mid + 1, end)
        : mid
}
```

```js
binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 6); // 2
binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 21); // -1
```
