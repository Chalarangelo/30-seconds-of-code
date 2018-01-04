### binarySearch

Use recursion to perform a logarithmic search similar to `.indexOf()` that finds the index of a value within an array. The two differences being 
1. Opperation only works with sorted arrays
2. Offers a major performance boost when compared liner search or `.indexOf()` 

```js
const binarySearch = (array, value, start = 0, end = array.length - 1) => {
  if (start > end) {
    return -1;
  }

  let middle = Math.floor((start + end) / 2);
  let value = array[middle];

  if (value > value) {
      return binarySearch(array, value, start, middle-1);
  }
  if (value < value) {
    return binarySearch(array, value, middle+1, end);
  }
  return middle;
}
```

```js
binarySearch([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 6); // 2
```
