### lcm

Returns the least common multiple of two numbers.

Use the greatest common divisor (GCD) formula and `Math.abs()` to determine the least common multiple.
The GCD formula uses recursion.

```js
const lcm = (x, y) => {
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  return Math.abs(x * y) / (gcd(x, y));
};
// lcm(12,7) -> 84
```
