### gcd

Calculates the greatest common divisor between two or more numbers/arrays.

The `helperGcd `function uses recursion.
Base case is when `y` equals `0`. In this case, return `x`.
Otherwise, return the GCD of `y` and the remainder of the division `x/y`.

```js
const gcd = (...arr) => {
  let data = [].concat(...arr);
  const helperGcd = (x, y) => (!y ? x : gcd(y, x % y));
  return data.reduce((a, b) => helperGcd(a, b));
};
```

```js
gcd(8, 36); // 4
```
