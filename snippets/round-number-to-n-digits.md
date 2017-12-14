### Round number to n digits

Correctly rounds a number to the specified number of digits.

```js
const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
// round(1.005, 2) -> 1.01
```
