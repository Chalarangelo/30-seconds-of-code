### functionName

Add Thousandth to a number.

Use regex. `\d{1,3}(?=(\d{3})+$)` means beginning with 1~3 numbers and ending with 3 numbers.

```js
const thousandthToNumber = n => (n + '').replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
```

```js
thousandthToNumber(1000) // '1,000'
```
