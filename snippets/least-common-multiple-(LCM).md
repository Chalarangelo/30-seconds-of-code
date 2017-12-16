### Least common multiple (LCM)

Use this lcm formula `lcm(a,b)=|a*b|/gcd(a,b)` for calculating the least common multiple of two numbers.
Makes use of the [GCD snippet](https://github.com/Chalarangelo/30-seconds-of-code#greatest-common-divisor-gcd).

```js
const lcm = (x,y) => Math.abs(x*y)/(gcd(x,y));
const gcd = (x, y) => !y ? x : gcd(y, x % y);
// lcm(10,5) -> 10
// lcm(12,7) -> 84
```
