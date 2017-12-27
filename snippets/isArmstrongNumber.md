### isArmstrongNumber

Checks if the given number is an Armstrong number or not.

Convert the given number into an array of digits. Use `Math.pow()` to get the appropriate power for each digit and sum them up. If the sum is equal to the number itself, return `true` otherwise `false`.

```js
const isArmstrongNumber = digits =>
  (arr => arr.reduce((a, d) => a + Math.pow(parseInt(d), arr.length), 0) == digits)((digits + '').split(''));
```

```js
isArmstrongNumber(1634) // true
isArmstrongNumber(371) // true
isArmstrongNumber(56) // false
```
