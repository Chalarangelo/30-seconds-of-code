### Maintain Digits

Use the modulo operator (`%`) to find values of single and tens digits.
Find which ordinal pattern digits match.
If digit is found in teens pattern, use teens ordinal.

```js
const setDigits = ( int=0, len=1, dir=0 ) => {
    return dir > 0 ? int.toString().padStart(len, "0") : int.toString().padEnd(len, "0");
}
// setDigits(1, 2, 0) -> "10"
// setDigits(1, 2, 1) -> "01"
// setDigits(11, 2, 1) -> "11"
```