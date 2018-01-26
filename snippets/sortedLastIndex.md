### sortedLastIndex

Returns the highest index at which value should be inserted into array in order to maintain its sort order.

Check if the array is sorted in descending order (loosely).
Use `Array.map()` to map each element to an array with its index and value.
Use `Array.reverse()` and `Array.findIndex()` to find the appropriate last index where the element should be inserted.

```js
const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .map((val, i) => [i, val])
    .reverse()
    .findIndex(el => (isDescending ? n <= el[1] : n >= el[1]));
  return index === -1 ? 0 : arr.length - index - 1;
};
```

```js
sortedLastIndex([10, 20, 30, 30, 40], 30); // 3
```
