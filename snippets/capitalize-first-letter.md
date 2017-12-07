### Capitalize first letter

Use `toUpperCase()` to capitalize first letter, `slice(1)` to get the rest of the string.

```js
var capitalize = str => str[0].toUpperCase() + str.slice(1);
```
