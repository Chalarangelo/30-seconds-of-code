### sumPower

Returns the sum of the powers of all the numbers from `start` to `end` (both inclusive).

Use `Array.fill()` to create an array of all the numbers in the target range, `Array.map()` and the exponent operator (`**`) to raise them to `power` and `Array.reduce()` to add them together.
Omit the second argument, `power`, to use a default power of `2`.
Omit the third argument, `start`, to use a default starting value of `1`.

```js
const sumPower = (end, power = 2, start = 1) =>
  Array(end + 1 - start)
    .fill(0)
    .map((x, i) => (i + start) ** power)
    .reduce((a, b) => a + b, 0);
```

```js
sumPower(10); // 385
sumPower(10, 3); //3025
sumPower(10, 3, 5); //2925
```
