### arrayLcm

Calculates the lowest common multiple (lcm) of an array of numbers.

Use `Array.reduce()` and the `lcm` formula (uses recursion) to calculate the lowest common multiple of an array of numbers.

```js
const arrayLcm = arr =>{
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  const lcm = (x, y) => (x*y)/gcd(x, y); 
  return arr.reduce((a,b) => lcm(a,b));
}
// arrayLcm([1,2,3,4,5]) -> 60
// arrayLcm([4,8,12]) -> 24
```
