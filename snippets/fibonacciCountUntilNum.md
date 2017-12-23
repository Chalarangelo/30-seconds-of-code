### fibonacciCountUntilNum

Returns the number of fibonnacci numbers up to `num`(`0` and `num` inclusive).

Use a mathematical formula to calculate the number of fibonacci numbers until `num`.

```js
const fibonacciCountUntilNum = num =>
  Math.ceil(Math.log(num * Math.sqrt(5) + 1/2) / Math.log((Math.sqrt(5)+1)/2));
// fibonacciCountUntilNum(10) -> 7
```
