### Take every nth element of an array

Use `Array.filter()` to create a new array that contains every nth element of a given array.

```js
const everynth = (arr, nth) => arr.filter((e, i) => i % nth === 0)
/*
 console.log(everynth([1,2,3,4,5,6], 2)) // -> [ 1, 3, 5 ]
*/
```
