### takeRightWhile

Removes elements from the end of an array until the passed function returns `true`. Returns the removed elements.

Loop through the array, using a `for...of` loop over `Array.keys()` until the returned value from the function is `true`.
Return the removed elements, using `Array.reverse()` and `Array.slice()`.

```js
const takeRightWhile = (arr, func) => {
  for (let i of arr.reverse().keys())
    if (func(arr[i])) return arr.reverse().slice(arr.length - i,arr.length);
  return arr;
};
```

```js
takeRightWhile([1, 2, 3, 4], n => n < 3); // [3, 4]
```
