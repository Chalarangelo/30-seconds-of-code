### gcdOfArray

It finds the GCD of all the numbers in an array by using `array.reduce` and the fact that `gcd(a,b,c) = gcd(gcd(a,b),c)`

```js
const gcdOfArray = arr =>
  {
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  arr.reduce((a,b) => gcd(a,b))
  }
// functionName(sampleInput) -> sampleOutput
```
