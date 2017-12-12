### Chunk Array

Creates an array of elements split into groups the length of size. 
If array can't be split evenly, the final chunk will be the remaining elements.

```js
const chunk = (arr, size) => 
  Array
    .apply(null, {length: Math.ceil(arr.length/size) })
    .map((value, index) => arr.slice(index*size, index*size+size) )

// const myArray = [2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 3, 2, 2];
// chunk(myArray, 3) -> [ [ 2, 2, 2 ], [ 2, 2, 2 ], [ 3, 2, 3 ], [ 2, 3, 2 ], [ 2 ] ]
```