### Factorial

Use recursion. If `n` is less than (for safety) or equal to `1`, return `1`. Otherwise, return the product of `n` and the factorial of `n - 1`.

```js
const factorial = n => n <= 1 ? 1 : n * factorial(n - 1)
```

Another way: create an array of length `n+1`, use `reduce()` to get the product of every value in the given range, utilizing the index of each element.

```js
var factorial = n =>
  Array.apply(null, [1].concat(Array(n))).reduce( (a, _, i) => a * i || 1 , 1);
```
