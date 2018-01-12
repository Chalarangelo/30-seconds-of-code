### Transform Int (12 Hour Format)

Use the modulo operator (`%`) to transform an integer to a 12 hour clock format.

```js
const to12Hour = ( int ) => {
    int = parseInt(int);

    return int === 0 || int === 12 || int === 24 ? 12 : int % 12;
}
// to12Hour(9) -> "9"
// to12Hour(9) -> "9"
// to12Hour(13) -> "1"
```