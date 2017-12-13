### Standard deviation

Use `Array.reduce()` to calculate the mean of the values, the variance of the values, and the sum of the variance
of the values to determine the standard deviation of an array of numbers.

NOTE: This is **population standard deviation**. Use `/ (arr.length - 1)` at the end to 
calculate **sample standard deviation**.

```js
const standardDeviation = (arr, val) =>
  Math.sqrt(
    arr.reduce((acc, val) => acc.concat(Math.pow(val - arr.reduce((acc, val) => acc + val, 0) / arr.length, 2)), [])
       .reduce((acc, val) => acc + val, 0) 
    / arr.length
  );
// standardDeviation([10,2,38,23,38,23,21]) -> 12.298996142875
```
