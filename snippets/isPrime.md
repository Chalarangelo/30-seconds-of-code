### isPrime

Checks if the provided intiger is primer number.

Returns `false` if the provided number has positive divisors other than 1 and itself or if the number itself is less than 2.

```js
const isPrime = num =>
  for (var i = 2; i < num; i++) if (num % i == 0) return false;
  return num >= 2;
// isPrime(11) -> true
// isPrime(12) -> false
// isPrime(1) -> false
```
