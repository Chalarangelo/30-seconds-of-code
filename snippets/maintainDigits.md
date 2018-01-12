### setDigits

Uses `String.padStart()` or `String.padEnd()` to maintain digit length of a provided integer. Returns stringified integer.

Control direction (0 = before integer, 1 = after integer).

```js
const setDigits = ( num=0, len=1, direction=0 ) => {
    return direction > 0 ? num.toString().padStart(len, "0") : num.toString().padEnd(len, "0");
}
// setDigits(1, 2, 0) -> "10"
// setDigits(1, 2, 1) -> "01"
// setDigits(11, 2, 1) -> "11"
```