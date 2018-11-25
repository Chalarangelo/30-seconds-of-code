### fibonacciUntilNum

Generates an array, containing the Fibonacci sequence, up until the nth term.

Create an empty array of the specific length, initializing the first two values (`0` and `1`).
Use `Array.prototype.reduce()` to add values into the array, using the sum of the last two values, except for the first two.
Uses a mathematical formula to calculate the length of the array required.

```js
const fibonacciUntilNum = num => {
  let n = Math.ceil(Math.log(num * Math.sqrt(5) + 1 / 2) / Math.log((Math.sqrt(5) + 1) / 2));
  return Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );
};
```

```js
fibonacciUntilNum(10); // [ 0, 1, 1, 2, 3, 5, 8 ]
```
