### Get max value from array
 
Passing an array, it executes the Math.max method using the spread operator to fill its variadic arguments and returns the maximum value found in the array.
 
```js
const getMaxValue = arr => Math.max(...arr);
// getMaxValue([10, 1, 5]) -> 10
```
