### Capitalize first letter

Use `toUpperCase()` to capitalize first letter, `slice(1)` to get the rest of the string.

```js
var capitalize = str => str.slice(0, 1).toUpperCase() + str.slice(1);
```
