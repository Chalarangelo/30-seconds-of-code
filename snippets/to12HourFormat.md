### to12Hour

Uses the modulo operator (`%`) to transform an integer to a 12 hour clock format.

```js
const to12Hour = ( num ) => {

    return num === 0 || num === 12 || num === 24 ? 12 : num % 12;
}
// to12Hour(9) -> "9"
// to12Hour(9) -> "9"
// to12Hour(13) -> "1"
```