### binarySearch

Use recursion. Similar to `Array.indexOf()` that finds the index of a value within an array.
The difference being this operation only works with sorted arrays which offers a major performance boost due to it's logarithmic nature when compared to a linear search or `Array.indexOf()`.

Search a sorted array by repeatedly dividing the search interval in half.
Begin with an interval covering the whole array.
If the value of the search is less than the item in the middle of the interval, recurse into the lower half. Otherwise recurse into the upper half.
Repeatedly recurse until the value is found which is the mid or you've recursed to a point that is greater than the length which means the value doesn't exist and return `-1`.

```js
const binarySearch = (arr, val, start = 0, end = arr.length - 1) => {
  if (start > end) return -1;
  const mid = Math.floor((start + end) / 2);
  if (arr[mid] > val) return binarySearch(arr, val, start, mid - 1);
  if (arr[mid] < val) return binarySearch(arr, val, mid + 1, end);
  return mid;
};
```

```js
binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 6); // 2
binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 21); // -1
```
