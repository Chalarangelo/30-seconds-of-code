### factorial

Calculates the factorial of a number.

Use recursion.
If `n` is less than or equal to `1`, return `1`.
Otherwise, return the product of `n` and the factorial of `n - 1`.
Throws an exception if `n` is a negative number.

```js
const factorial = n => n < 0 ? n % 2 == 0 ? Infinity : -Infinity : n == 0 ? 1 : (n = Math.round(n), n * factorial(n-1) )
// factorial(6) -> 720
// factorial(-6) -> Infinity
// factorial(-5) -> -Infinity
// factorial(0) -> 1
// factorial(5.5) -> 720
```
