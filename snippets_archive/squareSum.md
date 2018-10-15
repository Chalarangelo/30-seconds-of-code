### squareSum

Squares each number in an array and then sums the results together.

Use `Array.prototype.reduce()` to iterate over numbers and to declare an accumulator.
Use `Math.pow()` to calculate power of each number and add all numbers into acculmulator.

```js
const squareSum = (arr) => arr.reduce((squareSum, number) =>
  squareSum + Math.pow(number, 2), 0);
```

```js
squareSum([1, 2, 2]); // 9
```
