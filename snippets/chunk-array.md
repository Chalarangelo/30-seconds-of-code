### Chunk Array

Use `Array.apply()` to create a new array, that fits the number of chunks that will be produced.
Use `Array.map()` to map each element of the new array to a chunk the length of `size`.
If the original array can't be split evenly, the final chunk will contain the remaining elements.

```js
const chunk = (arr, size) => 
  Array.apply(null, {length: Math.ceil(arr.length/size)}).map((v, i) => arr.slice(i*size, i*size+size));

// const myArray = [2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 3, 2, 2];
// chunk(myArray, 3) -> [ [ 2, 2, 2 ], [ 2, 2, 2 ], [ 3, 2, 3 ], [ 2, 3, 2 ], [ 2 ] ]
```
