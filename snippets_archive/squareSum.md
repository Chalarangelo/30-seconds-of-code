### squareSum

Squares each number in an array and then sums the results together.

Use `Array.prototype.reduce()` in combination with `Math.pow()` to iterate over numbers and sum their squares into an accumulator.

```js
const squareSum = (...args) => args.reduce((squareSum, number) => squareSum + Math.pow(number, 2), 0);
```

```js
squareSum(1, 2, 2); // 9
```
