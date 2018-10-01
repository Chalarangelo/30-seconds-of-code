### factors

Returns the array of factors of the given `num`.
If the second argument is set to `true` returns only the prime factors of `num`.
If `num` is `1` or `0` returns an empty array.
If `num` is less than `0` returns all the factors of `-int` together with their additive inverses.

Use `Array.from()`, `Array.prototype.map()` and `Array.prototype.filter()` to find all the factors of `num`.
If given `num` is negative, use `Array.prototype.reduce()` to add the additive inverses to the array.
Return all results if `primes` is `false`, else determine and return only the prime factors using `isPrime` and `Array.prototype.filter()`.
Omit the second argument, `primes`, to return prime and non-prime factors by default.

**Note**:- _Negative numbers are not considered prime._

```js
const factors = (num, primes = false) => {
  const isPrime = num => {
    const boundary = Math.floor(Math.sqrt(num));
    for (var i = 2; i <= boundary; i++) if (num % i === 0) return false;
    return num >= 2;
  };
  const isNeg = num < 0;
  num = isNeg ? -num : num;
  let array = Array.from({ length: num - 1 })
    .map((val, i) => (num % (i + 2) === 0 ? i + 2 : false))
    .filter(val => val);
  if (isNeg)
    array = array.reduce((acc, val) => {
      acc.push(val);
      acc.push(-val);
      return acc;
    }, []);
  return primes ? array.filter(isPrime) : array;
};
```

```js
factors(12); // [2,3,4,6,12]
factors(12, true); // [2,3]
factors(-12); // [2, -2, 3, -3, 4, -4, 6, -6, 12, -12]
factors(-12, true); // [2,3]
```
