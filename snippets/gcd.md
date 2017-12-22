### gcd

Calculates the greatest common divisor between two or more numbers numbers.

The helper function uses recursion.
The helper case takes two arguments x and y
Base case is when `y` equals `0`. In this case, return `x`.
Otherwise, return the GCD of `y` and the remainder of the division `x/y`.

```js
const gcd = (...arr) => {
    const gcdHelper = (x, y) => !y ? x : gcd(y, x % y);
    return arr.reduce((a,b) => gcdHelper(a,b))
}
// gcd (8, 36) -> 4
```
