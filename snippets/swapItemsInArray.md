---
title: swapItemsInArray
tags: array,intermediate
---

Returns new array with two items swapped based on the inde value sent in argument 2nd and 3rd.

- Use `Array.prototype.splice()` to swap two items in an array
- In the 1st argument where the function swapItemsInArray is called send the array you want to transform
- 2nd and 3rd arguments are index values in the array(1st argument)
- Items in those indexes will be swapped in the output.


```js
const swapItemsInArray = (arr, idx1, idx2) => {
   arr[idx1] = arr.splice(idx2, 1, arr[idx1])[0];
  return arr;
}
  
```

```js
swapItemsInArray(['a', 'b', 'c', 'e', 'd'], 3, 4); // ["a", "b", "c", "d", "e"]
swapItemsInArray(['h0', 'h4', 'h2', 'h3', 'h0'], 1, 4); // ['h0', 'h1', 'h2', 'h3', 'h4']
```
