### Get Meridiem of Integer (12 hour format)

Use the modulo operator (`%`) to transform an integer to a 12 hour clock format. Affix appropriate meridiem to stringified integer.

```js
const toMeridiem = int => {
    int = parseInt(int);
    const meridiems = ["am", "pm"];
    let period = int > 11 ? 1 : 2;
    
    return int === 0 || int === 12 || int === 24 ? 12 + meridiems[period] : int % 12 + meridiems[period];
}
// toMeridiem(0) -> "12am"
// toMeridiem(9) -> "9am"
// toMeridiem(13) -> "1pm"
```