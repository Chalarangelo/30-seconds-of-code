### takeWhile

Removes elements in an array until the passed function returns `true`. Returns the removed elements.

Loop through the array, using a `for...of` loop over `Array.keys()` until the returned value from the function is `true`.
Return the removed elements, using `Array.slice()`.

```js
const takeWhile = (arr, func) => {
  for (let i of arr.keys()) if (func(arr[i])) return arr.slice(0, i);
  return arr;
};
```

```js
takeWhile([1, 2, 3, 4], n => n >= 3); // [1, 2]
```
