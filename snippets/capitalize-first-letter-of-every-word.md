### Capitalize first letter of every word

Use `replace()` to match the first character of each word and `toUpperCase()` to capitalize it.

```js
var capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
```
