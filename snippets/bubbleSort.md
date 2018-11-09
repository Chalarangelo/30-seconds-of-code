### bubble_sort

Sorts an array using the bubble_sort algorithm

Takes in an array of numbers, along with an array size, and "bubbles" up the biggest values to the end of the array until the array is sorted.

```js
const bubble_sort = (arr, size) => {
  var i, j, temp;

  for(i = 0; i < size - 1; i++) {
    for(j = 0; j < size - i - 1; j++) {
      if(arr[j] > arr[j+1];
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
    }
  }
  return arr;
};
```

```js
bubble_sort([5, 4, 3, 2, 1], 5); // [1, 2, 3, 4, 5]
bubble_sort([2, 1, 5, 3, 0], 5); // [0, 1, 2, 3, 5]
bubble_sort([99, 12, 3, 52, 7], 5); // [3, 7, 12, 52, 99]
```

