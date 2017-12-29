### lcm

Returns the least common multiple of two or numbers/arrays.

Use the greatest common divisor (GCD) formula and `Math.abs()` to determine the least common multiple.
The GCD formula uses recursion.

```js
const lcm = (...arr) => {
  let data = [].concat(...arr);
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const helperLcm = (x, y) => x * y / gcd(x, y);
  return arr.reduce((a, b) => helperLcm(a, b))
}
```

```js
lcm(12, 7); // 84
lcm([1,3,4],5); // 60 
```
