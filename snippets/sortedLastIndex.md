### sortedLastIndex

Returns the highest index at which value should be inserted into array in order to maintain its sort order.

Check if the array is sorted in descending order (loosely).
Use `Array.map()` to map each element to an array with its index and value.
Use `Array.filter()` to find all possible positions where the element could be inserted, `Array.slice(-1)` to get the last one.

```js
const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .map((val, i) => [i, val])
    .filter(el => (isDescending ? n >= el[1] : n >= el[1]))
    .slice(-1)[0][0];
  return index === -1 ? arr.length : index;
};
```

```js
sortedLastIndex([10, 20, 30, 30, 40], 30); // 3
```
