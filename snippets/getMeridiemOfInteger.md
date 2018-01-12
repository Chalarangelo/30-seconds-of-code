### toMeridiem

Uses modulo operator (`%`) to transform an integer to a 12 hour clock format. Stringifies transformed integer with concatenated meridiem suffix. Maintains 12 hour format principles with conditional check (0am - 12am).

```js
const toMeridiem = num => {
    const meridiems = ["am", "pm"];
    let period = num > 11 ? 1 : 2;
    
    return num === 0 || num === 12 || num === 24 ? 12 + meridiems[period] : num % 12 + meridiems[period];
}
// toMeridiem(0) -> "12am"
// toMeridiem(9) -> "9am"
// toMeridiem(13) -> "1pm"
```