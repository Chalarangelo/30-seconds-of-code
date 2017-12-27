### arrayGcd

Calculates the greatest common denominator (gcd) of an array of numbers.

Use `Array.reduce()` and the `gcd` formula (uses recursion) to calculate the greatest common denominator of an array of numbers.

```js
const arrayGcd = arr =>{
  const gcd = (x, y) => !y ? x : gcd(y, x % y);
  return arr.reduce((a,b) => gcd(a,b));
}
```

```js
arrayGcd([1,2,3,4,5]) // 1
arrayGcd([4,8,12]) // 4
```
