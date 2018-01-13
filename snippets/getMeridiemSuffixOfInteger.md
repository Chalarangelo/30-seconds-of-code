### getMeridiemSuffixOfInteger

Uses modulo (`%`) and conditional checks to transform integer to a stringified 12 hour format with meridiem suffix. Conditionals maintain 12 hour principles (0am - 12am).

Does not handle integers not representing an hour time (ie: 25, 1000, etc...)

```js
const getMeridiemSuffixOfInteger = num => num === 0 || num === 24 ? 12 + "am" : num === 12 ? 12 + "pm" : num < 12 ? (num % 12) + "am" : (num % 12) + "pm";
```

```js
getMeridiemSuffixOfInteger(0) // "12am"
getMeridiemSuffixOfInteger(11) // "11am"
getMeridiemSuffixOfInteger(13) // "1pm"
getMeridiemSuffixOfInteger(25) // "1pm"
```