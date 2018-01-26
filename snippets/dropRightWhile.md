### dropRightWhile

Removes elements from the end of an array until the passed function returns `true`. Returns the remaining elements in the array.

Loop through the array, using `Array.slice()` to drop the last element of the array until the returned value from the function is `true`.
Returns the remaining elements.

```js
const dropRightWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1);
  return arr;
};
```

```js
dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]
```
