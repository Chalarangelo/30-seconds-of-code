### Standard deviation

Use `Array.reduce()` to calculate the mean of the values, the variance of the values, and the sum of the variance
of the values to determine the standard deviation of an array of numbers.

Since there are two types of standard deviation, population and sample, you can use a flag to switch to population (sample is default).

```js
const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat(Math.pow(val - mean, 2)), [])
       .reduce((acc, val) => acc + val, 0) 
    / (arr.length - (usePopulation ? 0 : 1))
  );
 }
// standardDeviation([10,2,38,23,38,23,21]) -> 13.284434142114991 (sample)
// standardDeviation([10,2,38,23,38,23,21], true) -> 12.29899614287479 (population)
```
