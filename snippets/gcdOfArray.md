### gcdOfArray

It finds the GCD of all the numbers in an array by using `array.reduce` and the fact that `gcd(a,b,c) = gcd(gcd(a,b),c)`

```js
const gcdOfArray = arr =>
  {
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  return arr.reduce((a,b) => gcd(a,b))
  }
// gcdOfArray([1,2,3,4,5]) -> 1
// gcdOfArray([4,8,12]) -> 4
```
